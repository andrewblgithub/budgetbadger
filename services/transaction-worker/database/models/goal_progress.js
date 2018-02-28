const { db } = require('../index.js');

const GoalProgress = db.Model.extend({
  tableName: 'goal_progress',  
  goal_id: () => {
    return this.belongsTo(Goal, 'id');
  }
})

module.exports = GoalProgress;