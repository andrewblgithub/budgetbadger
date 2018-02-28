module.exports = `
  scalar Date

  type User {
    id: Int!
    email: String!
    password: String!
    first_name: String
    last_name: String
    street: String
    zip_code: String
    city: String
    state: String
    phone: String
    date: [String]
    token: String
    transactions: [Transaction!]
    school: [School!]
    accounts: [Account!]
    banks: [Bank!]
    bills: [Bill!]
    goals: [Goal!]
  }

  type Loan {
    id: Int!
    name: String!
    amount: Float!
    interest_rate: Float!
    inception_date: String!
    end_date: String!
    recurrence: String!
    user_id: Int!
    user: [User!]
    loan_payments: [Loan_Payment!]
  }

  type Loan_Payment {
    id: Int!
    amount: Float!
    date: String!
    loan_id: Int!
    user_id: Int!
    user: [User!]
    loan: [Loan!]
  }

  type Transaction {
    id: Int!
    plaid_id: String
    user_id: Int!
    amount: Float!
    category: String!
    date: String!
    name: String!
    account_id: String
    street: String
    zip_code: String
    state: String
    user: [User!]
    account: [Account!]
  }

  type Daily_Transaction {
    id: Int!
    plaid_id: String
    user_id: Int!
    amount: Float!
    category: String!
    date: String!
    name: String!
    account_id: String
    street: String
    zip_code: String
    state: String
    user: [User!]
    account: [Account!]
  }

  type Account {
    id: String!
    user_id: Int!
    bank_id: String!
    bank_name: String!
    type: String!
    current_balance: Int!
    limit: Int
    transactions: [Transaction!]
    monthly_balance: [MonthlyBalance!]
  }

  type School {
    id: Int!
    name: String!
    user_id: [User!]
  }

  type Bank {
    id: String!
    access_token: String!
    last_updated: Date
    previous_updated: Date
    user_id: Int!
    accounts: [Account!]
  }
  
  type Bill {
    id: Int!
    user_id: Int!
    bill_category_id: Int!
    description: String!
    amount: Float!
    bill_recurrence_id: Int!
    start_date: Date
    end_date: Date
    last_paid_date: Date
    last_occurence_date: Date
    bill_status: Boolean
    alert: Boolean
    bill_category: [BillCategory!]
    bill_recurrence: [BillRecurrence!]
    bill_payment_history: [BillPaymentHistory]
  }

  type BillCategory {
    id: Int!
    name: String!
    bills: [Bill!]
  }
  
  type Goal {
    id: Int!
    user_id: Int!
    description: String!
    amount: String!
    start_date: Date!
    is_budget: Boolean!
    end_date: Date
    goal_progress: [GoalProgress!]
    goal_categories: [GoalCategory!]
    goal_accounts: [GoalAccount!]
  }

  type GoalCategory {
    id: Int!
    goal_id: Int!
    name: String!
  }
  
  type GoalAccount {
    id: Int!
    goal_id: Int!
    account_id: String!
    account: [Account!]
  }
  
  type GoalProgress {
    id: Int!
    goal_id: Int!
    amount: String!
    date: Date!
  }
  
  type MonthlyBalance {
    id: Int!
    account_id: String!
    amount: String!
    date: Date!
  }

  type BillPaymentHistory {
    id: Int!
    bill_id: Int!
    user_id: Int!
    amount_paid: Float
    amount_due: Float
    paid_date: Date
    due_date: Date
    paid: Boolean
    bills: [Bill!]
    user: [User!]
  }

  type BillRecurrence {
    id: Int!
    recurrence_type : String!
    bills: [Bill!]
  }

  type Query {
    getUser(email: String, id: Int): [User!]
    getTransactions(user_id: Int!): [Transaction!]
    getAccounts(user_id: Int!): [Account!]
    getAccount(account_id: String!): [Account!]
    getSchools(user_id: Int!): [School!]
    getBill(id: Int!): [Bill!]
    getBills(user_id: Int!): [Bill!]
    getBillCategories(user_id: Int!): [BillCategory!]
    getLoans(user_id: Int!): [Loan!]
    getLoanPayments(loan_id: Int!): [Loan_Payment!]
    getGoals(user_id: Int!): [Goal!]
    getBillPaymentHistory(user_id: Int!, bill_id: Int): [BillPaymentHistory!]
    getBillRecurrence(id:Int): [BillRecurrence!]
  }

  type Mutation {
    createTransaction(user_id: Int!, amount: Float!, date: String!, category: String!, name: String!, account_id: String!, street: String, zip_code: String, state: String ): Transaction
    createUser(email: String!, password: String!, date: String): [String!]
    createAccount(id: String!, user_id: Int!, bank_name: String!, bank_id: String!, type: String!, current_balance: Int!): Account!
    createSchool(name: String!): School!
    createLoan(name: String!, amount: Float!, interest_rate: Float!, inception_date: String!, end_date: String!, user_id: Int!): Loan
    createLoanPayment(amount: Int!, date: String!, loan_id: Int!, user_id: Int!): Loan_Payment
    deleteLoan(id: Int!): Int!
    deleteUser(email: String!): Int!
    loginUser(email: String!, password: String!): [String!]
    addBank(id: String!, access_token: String!, user_id: Int!, last_updated: String): Bank
    updateUser(
      id: Int!
      email: String
      first_name: String
      last_name: String
      city: String
      street: String
      zip_code: String
      state: String
      token: String
      phone: String): User
      updateEmail(
        id: Int!    
        email: String
        first_name: String
        last_name: String
        city: String
        street: String
        zip_code: String
        state: String
        phone: String): User
    createBill(user_id: Int!, bill_category_id: Int!, description: String!, amount: Float!, bill_recurrence_id: Int!, start_date: Date, end_date: Date, last_paid_date: Date, last_occurence_date: Date, bill_status: Boolean, alert: Boolean): Bill!
    deleteBill(id: Int!): Int!
    updateBill(id: Int!, user_id: Int, bill_category_id: Int, description: String, amount: Float, bill_recurrence_id: Int, start_date: Date, end_date: Date, last_paid_date: Date, last_occurence_date: Date, bill_status: Boolean, alert: Boolean): Bill
    createBillCategory(name: String!, user_id: Int!): BillCategory!
    updateBillCategory(id: Int!, name: String!): BillCategory!
    deleteBillCategory(id: Int!): Int!
    createBillRecurrence(recurrence_type: String!): BillRecurrence!
    deleteBillRecurrence(id: Int!): Int!
    createBillPaymentHistory(bill_id: Int!, user_id: Int!, amount_paid: Float, amount_due: Float, paid_date: Date, due_date: Date!, paid: Boolean): BillPaymentHistory!
    updateBillPaymentHistory(id:Int!, user_id: Int,  bill_id: Int, amount_paid: Float, amount_due: Float, paid_date: Date, due_date: Date, paid: Boolean): BillPaymentHistory!
    deleteBillPaymentHistory(id:Int!): Int!
    createBankAccount(user_id: Int!, public_key: String!): String!
    getUpdatedTransactions(user_id: Int!): [Transaction!]
    getPasswordRecoveryEmail(email: String!) : [User!]
    updatePassword(
      email: String!
      password: String!): [String!]
    createGoal(user_id: Int!, description: String!, amount: String!, start_date: Date!, end_date: Date, is_budget: Boolean!, accounts:[String], categories: [String]): Goal
  }
  `