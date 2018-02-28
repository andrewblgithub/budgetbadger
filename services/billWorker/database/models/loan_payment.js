const { db } = require('../index.js');

const Loan_Payment = db.Model.extend({
  tableName: 'loan_payments',
  user_id: () => {
    return this.belongsTo(User, 'id');
  },
  loan_id: () => {
    return this.belongsTo(Loan, 'id');
  }
});

module.exports = Loan_Payment;