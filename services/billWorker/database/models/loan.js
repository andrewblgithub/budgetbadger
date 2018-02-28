const { db } = require('../index.js');

const Loan = db.Model.extend({
  tableName: 'loans',  
  user_id: () => {
    return this.belongsTo(User, 'id');
  }
})

module.exports = Loan;