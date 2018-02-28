const Account = require('./account.js');
const User = require('./user.js');
const Transaction = require('./transaction.js');
const DailyTransaction = require('./daily_transaction.js');
const School = require('./school.js');
const Bank = require('./banks.js');
const Bill = require('./bill.js');
const Loan = require('./loan.js');
const Loan_Payment = require('./loan_payment.js');
const BillCategory = require('./billcategory.js');
const Goal = require('./goal.js')
const GoalCategory = require('./goal_category.js')
const GoalAccount = require('./goal_account.js')
const GoalProgress = require('./goal_progress.js')
const MonthlyBalance = require('./monthly_balance.js')
const BillRecurrence = require('./bill_recurrence.js');
const BillPaymentHistory = require('./bill_payment.js');

module.exports = {
  Account,
  User,
  Transaction,
  DailyTransaction,
  School,
  Bank,
  Bill,
  BillCategory,
  Loan,
  Loan_Payment,
  Goal,
  GoalCategory,
  GoalAccount,
  GoalProgress,
  MonthlyBalance,
  BillRecurrence,
  BillPaymentHistory
}