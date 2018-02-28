const { db } = require('../index.js');
const User = require('./user.js')
const Account = require('./account.js')

const Transaction = db.Model.extend({
  tableName: 'transactions',
  user_id: () => {
    return this.belongsTo(User, 'id');
  },
  account_id: () => {
    return this.belongsTo(Account, 'id');
  }
})

module.exports = Transaction;