const { db } = require('../index.js');

const Bank = db.Model.extend({
  tableName: 'banks',
  user_id: () => {
    return this.belongsTo(User, 'id');
  }
})

module.exports = Bank;