const jwt = require('jsonwebtoken');
const _ = require('lodash')
const plaid = require('../plaid.js')
const sendgrid = require('../sendgrid.js');
const moment = require('moment')
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const knex = require('../database/index.js').knex;

module.exports = {

  User: {
    transactions: ({ id }, args, { knex, user }) => 
      knex('transactions').where({
        user_id: id
      }),
      
    accounts: ({ id }, args, { knex }) => 
      knex('accounts').where({
        user_id: id
      }),

    school: ({ id }, args, { knex }) =>
      knex('schools').where({
        user_id: id
      }),

    banks: ({ id }, args, { knex }) =>
      knex('banks').where({
        user_id: id
      }),

    bills: ({ id }, args, { knex }) => 
      knex('bills').where({
        user_id: id
      })
  },

  Loan: {
    user: ({ user_id }, args, { knex }) => 
      knex('users').where({
        id: user_id
      }),
    loan_payments: ({ id }, args, { knex }) =>
      knex('loan_payments').where({
        loan_id: id
      })
  },

  Loan_Payment: {
    user: ({ user_id }, args, { knex }) => 
      knex('users').where({
        id: user_id
      }),
    loan: ({ loan_id }, args, { knex }) =>
      knex('loans').where({
        id: loan_id
      })
  },

  Transaction: {
    user: ({ user_id }, args, { knex }) => 
      knex('users').where({
        id: user_id
      }),

    account: ({ account_id }, args, { knex }) => 
      knex('accounts').where({
        id: account_id
      })
  },

  Account: {
    transactions: ({ id }, args, { knex }) => 
      knex('transactions').where({
        account_id: id
      })
  },

  Bill: {
    bill_category: ({ bill_category_id }, args, { knex }) => 
      knex('bill_categories').where({
        id: bill_category_id
      }), 
    bill_recurrence: ({ bill_recurrence_id }, args, { knex }) => 
      knex('bill_recurrence').where({
        id: bill_recurrence_id
      }),
    bill_payment_history: ({ bill_id }, args, { knex }) => 
      knex('bill_payment_history').where({
        bill_id
      })
  },

  BillCategory: {
    bills: ({ id }, args, { knex }) => 
      knex('bills').where({
        bill_category_id: id
      })
  },

  BillPaymentHistory: {
    user: ({ user_id }, args, { knex }) => 
    knex('users').where({
      id: user_id
    }),
    bills: ({ bill_id }, args, { knex }) => 
    knex('bills').where({
      id: bill_id
    })
  },

  BillRecurrence: {
    bills: ({ id }, args, { knex }) => 
      knex('bills').where({
        bill_recurrence_id: id})},

  Goal: {
    goal_progress: ({ id }, args, { knex }) => 
      knex('goal_progress').where({
        goal_id: id
      }),
    goal_categories: ({ id }, args, { knex }) => 
      knex('goal_categories').where({
        goal_id: id
      }),
    goal_accounts: ({ id }, args, { knex }) => 
      knex('goal_accounts').where({
        goal_id: id
      })
  },

  GoalAccount: {
    account: ({ account_id }, args, { knex }) => 
      knex('accounts').where({
        id: account_id
      })
  },


  Query: {
    getUser: (parent, args, { knex, user }) => { 
      // ADD THE BELOW LOGIC TO ANY PRIVATE ROUTES
      console.log('ARGS!!!', args);
      // if (user) {
        console.log('user', user)
        return knex('users').where(args)
      // } else {
      //   throw new Error('Not authenticated')
      // }
    },

    getTransactions: (parent, { user_id }, {knex, user}) =>   
      knex('transactions').where({
        user_id: user_id
      }), 

    getAccounts: (parent, { user_id }, { knex, user }) => 
      knex('accounts').where({
        user_id: user_id
      }),

    getAccount: (parent, { account_id }, { knex }) =>
      knex('accounts').where({
        account_id
      }),
  
    getSchools: (parent, { id }, { knex }) =>
      knex.select().from('schools').where({
        id
      }),
      
    getBillCategories: (parent, { user_id }, { knex }) => 
      knex('bill_categories').where({
        user_id
      }),
    
    getBill: (parent, { id }, { knex }) => 
      knex('bills').where({
        id
      }),

    getBills: (parent, { user_id }, { knex, user }) => 
      knex('bills').where({
        user_id: user_id
      }),

    getLoans: (parent, { user_id }, { knex, user }) => 
      knex('loans').where({
        user_id: user_id
      }),
    getLoanPayments: (parent, { loan_id }, { knex }) =>
      knex('loan_payments').where({
        loan_id
      }),

    getBillPaymentHistory: (parent, args, { knex }) =>
      knex('bill_payment_history').where(
        args
      ),

    getBillRecurrence:  (parent, { id }, { knex }) =>
      knex('bill_recurrence').where({

      }),
      
    getGoals: (parent, { user_id }, { knex }) => 
      knex('goals').where({
        user_id: user_id
      }),
    
  },

  Mutation: {
    createBankAccount: (parent, { user_id, public_key }, { knex, models, user }) => {
      plaid.exchangeToken(public_key)
      .then(res => {
        new models.Bank({ 
          user_id: user.user.id, 
          id: res.item_id, 
          access_token: res.access_token,
          last_updated: '1999-10-10'
        }).save(null, {method: 'insert'});
      })
    },

    getUpdatedTransactions: (parent, { user_id }, { knex, models, user }) => {
      console.log('')
      knex.select('*').from('banks').where({user_id: user.user.id})
      .then(banks => {
        banks.forEach(bank => {
          new models.Bank(bank).fetch()
          .then(bank => {
            const today = moment().format('YYYY-MM-DD')
            const startTime = bank.attributes.last_updated
            return bank.save({
              last_updated: today,
              previous_updated: startTime
            })
          })
          .then(bank => {
            bank = bank.attributes
            plaid.getAccountsAndTransactions(bank.access_token, bank.previous_updated)
            .then(response => {
              response.accounts.forEach(account => {
                new models.Account({id: account.account_id}).fetch()
                .then(fetchedAccount => {
                  if (fetchedAccount) {
                    fetchedAccount.save({
                      current_balance: account.balances.current_balance
                    })
                  } else {
                    new models.Account({
                      id: account.account_id,
                      user_id: bank.user_id,
                      bank_name: account.name,
                      limit: account.balances.limit,
                      current_balance: account.balances.current,
                      type: account.type,
                      bank_id: bank.id,
                    })
                    .save(null, {method: 'insert'})
                  }
                })
              })
              return response
            })
            .then(response => {
              response.transactions.map(async transaction => {
                const today = moment().format('YYYY-MM-DD');
                let category = transaction.category ? transaction.category[0] : 'UNCATEGORIZED';
                if (transaction.date !== today) {
                  return await new models.Transaction({
                    user_id: bank.user_id,
                    plaid_id: transaction.transaction_id,
                    category: category,
                    date: transaction.date,
                    account_id: transaction.account_id,
                    amount: transaction.amount,
                    name: transaction.name
                  })
                  .save(null, {method: 'insert'})
                } else {
                  return await new models.DailyTransaction({
                    user_id: bank.user_id,
                    plaid_id: transaction.transaction_id,
                    category: category,
                    date: transaction.date,
                    account_id: transaction.account_id,
                    amount: transaction.amount,
                    name: transaction.name
                  })
                  .save()
                }
              });
            })
          })
        })
      })
    },

    createUser: async (parent, args, { models, APP_SECRET }) => {
      const { email } = args;
      const exists = await new models.User({ email }).fetch();
      if (exists) {
        throw new Error('That email already exists');
      }
      args.date = new Date();
      const user = await new models.User(args).save();
      const token = jwt.sign({ user: _.pick(user.attributes, ['id', 'email'])}, APP_SECRET, {
        expiresIn: 360*60
      })
      
      return [token, user.attributes.id]
    },

    deleteUser: (parent, args, { knex }) => knex('users').where(args).del(),

    loginUser: async (parent, { email, password }, { models, APP_SECRET }) => {
      const user = await new models.User({ email }).fetch();
      if (!user) {
        throw new Error('Unable to match the email');
      }
      const match = await user.comparePassword(password);
      if (!match) {
        throw new Error('Unable to match the password');
      }
      const token = jwt.sign({ user: _.pick(user.attributes, ['id', 'email'])}, APP_SECRET, {
        expiresIn: 360*60*60
      })
      return [token, user.attributes.id]
    },

    createTransaction: async (parent, args, { models }) => {
      console.log('adding transaction')
      const transaction = await new models.Transaction(args).save(null, {method: 'insert'});
      return transaction.attributes;
    },

    createAccount: async (parent, args, { knex, models }) => {
      const account = await new models.Account(args).save(null, {method: 'insert'});
      return account.attributes;
    },

    updateUser: async (parent, args, {models, knex}) => {
      const { id } = args;
      const user = await new models.User({id}).fetch();
      const { email } = user;

      for(let field in user.attributes) {
        console.log("ARGS[FIELD]", args[field], field);
        console.log("USER ATTRIBUTES AND FIELD", user.attributes[field], field);
        if (args[field]) {
          user.attributes[field] = args[field]
        }
      }
      console.log("args:", args);
      console.log('USER.ATTRIBUTES:', user.attributes);
      let updated = await new models.User(user.attributes).save();
      console.log("UPDATED:", updated);
      return updated.attributes
    },

    updateEmail: async (parent, args, {models, knex}) => {
      const { id } = args;
      const user = await new models.User({id}).fetch();
      const { email } = user;
      for (let field in user.attributes) {
        if (args[field]) {
          user.attributes[field] = args[field]
        }
      }
      return knex('users').where({ id }).update(user.attributes);
    },

    createSchool: async (parent, args, { models }) => {
      const school = await new models.School(args).save(null, {method: 'insert'});
      return school.attributes;
    },

    addBank: async (parent, args, { models }) => {
      const bank = await new models.Bank(args).save(null, {method: 'insert'});
      return bank.attributes;
    },
    
    createBill: async (parent, args, { models }) => {
      const bill = await new models.Bill(args).save(null, {method: 'insert'});
      return bill.attributes;
     },

    updateBill: async (parent, args, { models }) => {
      const bill = await new models.Bill(args).save(null, {method: 'update'});
      return bill.attributes;
    },

    deleteBill: (parent, args, { knex }) => knex('bills').where(args).del(),

    createBillCategory: async (parent, args, { models }) => {
      const billCategory = await new models.BillCategory(args).save(null, {method: 'insert'});
      return billCategory.attributes;
    },

    updateBillCategory: async (parent, args, { models }) => {
      const billCategory = await new models.BillCategory(args).save(null, {method: 'update'});
      return billCategory.attributes;
    },

    deleteBillCategory: (parent, args, { knex }) => knex('bill_categories').where(args).del(),


    createBillRecurrence: async (parent, args, { models }) => {
      const billRecurrence = await new models.BillRecurrence(args).save(null, {method: 'insert'});
      return billRecurrence.attributes;
    },
    
    deleteBillRecurrence: async (parent, args, { knex }) => knex('bill_recurrence').where(args).del(),

    createBillPaymentHistory: async (parent, args, { models }) => {
      const billPaymentHistory = await new models.BillPaymentHistory(args).save(null, {method: 'insert'});
      return billPaymentHistory.attributes;
     },

    updateBillPaymentHistory: async (parent, args, { models }) => {
      const billPaymentHistory = await new models.BillPaymentHistory(args).save(null, {method: 'update'});
      return billPaymentHistory.attributes;
    },

    deleteBillPaymentHistory: (parent, args, { knex }) => knex('bill_payment_history').where(args).del(),

    createLoan: async (parent, args, { models }) => await new models.Loan(args).save(null, {method:'insert'}),

    createLoanPayment: async (parent, args, { models }) => await new models.Loan_Payment(args).save(null, {method: 'insert'}),

    getPasswordRecoveryEmail: async (parent, args, { knex, models, APP_SECRET }) => {
      let { email } = args;
      let user = await new models.User({email}).fetch();
      if (!user) {
        throw new Error('Unable to match the provided credentials');
      }
      let token = jwt.sign({ user: _.pick(user.attributes, ['date', 'id'])}, APP_SECRET, {
        expiresIn: 360*60
      })
      token = token.split('').map(item => {
        if (item === '.') {
          return '_'
        } else {
          return item;
        }
      }).join('');
      user.attributes['token'] = token;
      let updated = await new models.User(user.attributes).save();
      knex('users').where(args).then((data) => {
        sendgrid.sendEmail(data[0].first_name, data[0].email, token)
      })
    },
    updatePassword: async (parent, args, { models, knex }) => {
      const { email } = args;
      const { password } = args;
      const user = await new models.User({email}).fetch();
      let hasher = Promise.promisify(bcrypt.hash);
      hasher(password, 10).bind(this)
           .then(async hash => {
              user.attributes['token'] = null;
              user.attributes['password'] = hash;
              let updated = await new models.User(user.attributes).save();
           })
           .catch(err => console.log(err));

    },
    deleteLoan: (parent, args, { knex }) => knex('loans').where(args).del(),

    createGoal: async (parent, args, { models}) => {
      let goalProperties = {
        user_id: args.user_id,
        description: args.description,
        amount: args.amount,
        is_budget: args.is_budget,
        start_date: args.start_date
      }
      if (args.end_date) {
        goalProperties.end_date = args.end_date
      }
      let newGoal = await new models.Goal(goalProperties).save(null, {method: 'insert'});
      Promise.all(
        args.categories.map(async category => {     
          return await new models.GoalCategory({
            goal_id: newGoal.attributes.id,
            name: category
          }).save(null, {method: 'insert'});
        })
      )
      Promise.all(
        args.accounts.map(async account => {     
          return await new models.GoalAccount({
            goal_id: newGoal.attributes.id,
            account_id: account
          }).save(null, {method: 'insert'});
        })
      )
      return newGoal
    }
  }
}




