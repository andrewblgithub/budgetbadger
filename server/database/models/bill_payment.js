const { db } = require('../index.js');
const User = require('./user.js')
const Bill = require('./bill.js');

const BillPaymentHistory = db.Model.extend({
  tableName: 'bill_payment_history',
  user_id: () => {
    return this.belongsTo(User, 'id');
  },
  bill_id: () => {
    return this.belongsTo(Bill, 'id');
  }
})

module.exports = BillPaymentHistory;