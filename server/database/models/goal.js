const { db } = require('../index.js');

const Goal = db.Model.extend({
  tableName: 'goals',  
  user_id: () => {
    return this.belongsTo(User, 'id');
  }
})

module.exports = Goal;