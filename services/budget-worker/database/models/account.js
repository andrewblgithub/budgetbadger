const { db } = require('../index.js');
const Bank = require('./banks.js')

const Account = db.Model.extend({
  tableName: 'accounts',
  user_id: () => {
    return this.belongsTo(User, 'id');
  },
  bank_id: () => {
    return this.belongsTo(Bank, 'id');
  }
})

module.exports = Account;