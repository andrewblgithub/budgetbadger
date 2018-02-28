const { db } = require('../index.js');
const Bill = require('./bill.js');

const BillRecurrence = db.Model.extend({
  tableName: 'bill_recurrence',  
  bill_id: () => {
    return this.belongsTo(Bill, 'id');
  }
})

module.exports = BillRecurrence;