const { db } = require('../index.js');

const School = db.Model.extend({
  tableName: 'schools',
  users: function() {
    return this.hasMany(User);
  }
});

module.exports = School;