const { db } = require('../index.js');
const User = require('./user.js');

const BillCategory = db.Model.extend({
  tableName: 'bill_categories',  
  user_id: () => {
    return this.belongsToMany(User, 'id');
  }
})

module.exports = BillCategory;