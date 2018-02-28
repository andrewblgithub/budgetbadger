const knex = require('./database/index.js').knex;
const models = require('./database/index.js');
const Promise = require('bluebird');
const plaid = require('./plaid.js');

const fetchBanks = () => {
  return knex.select('*').from('banks').then(res => {
    return res
  });
}

const fetchTransactions = async () => {
  // const date = new Date(Date.now() - 864e5)
  const date = '1990-10-10'
  const banks = await fetchBanks()
  return await Promise.all(banks.map(async (bank) => {
    let user = await plaid.getAccountsAndTransactions(bank.access_token, date)
    user.user_id = bank.user_id;
    return user;
  }))
}

const parseTransactions = async () => {
  const recentTransactions = await fetchTransactions();
  recentTransactions.forEach(user => {
    let user_id = user.user_id;
    user.transactions.forEach(transaction => {
      let category = transaction.category ? transaction.category[0] : 'none';
      let newTransaction = {
        user_id,
        category,
        plaid_id: transaction.transaction_id,
        date: transaction.date,
        account_id: transaction.account_id,
        amount: transaction.amount,
        name: transaction.name
      }
      knex('daily_transactions').where({plaid_id: transaction.transaction_id})
      .then(async exists => {
        if (!exists.length) {
          await knex('daily_transactions').insert(newTransaction)
        }
      })
    })
  })
}

const submitToMain = async () => {
  const endOfDayTransactions = await knex.select('user_id', 'category', 'account_id', 'amount', 'date', 'name').from('daily_transactions');
  knex('transactions').insert(endOfDayTransactions).then(async () => {
    await knex.raw(`DELETE FROM daily_transactions WHERE id > 0`)
  });
}

module.exports = {
  fetchTransactions,
  parseTransactions,
  submitToMain
}


// console.log(plaid.getAccountsAndTransactions(banks[0].access_token, '1990-10-10').then(res =>console.log(res)))