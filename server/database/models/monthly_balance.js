const { db } = require('../index.js');

const MonthlyBalance = db.Model.extend({
  tableName: 'monthly_balance',
  account_id: () => {
    return this.belongsTo(Account, 'id');
  }
})

module.exports = MonthlyBalance;