const { db } = require('../index.js');
const User = require('./user.js');
const BillCategory = require('./billcategory.js');
const BillPaymentHistory = require('./bill_payment.js');
const BillRecurrence = require('./bill_recurrence.js');

const Bill = db.Model.extend({
  tableName: 'bills',
  user_id: () => {
    return this.belongsTo(User, 'id');
  },
  bill_category_id: () => {
    return this.belongsTo(BillCategory, 'id');
  },
  bill_recurrence_id: () => {
    return this.hasOne(BillRecurrence, 'id');
  },
  bill_payments: () => {
    return this.hasMany(BillPaymentHistory);
  }
})

module.exports = Bill;