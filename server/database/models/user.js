const { db } = require('../index.js');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const School = require('./school.js');

const User = db.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('creating', this.hashPassword);
    // this.on('updating', this.hashPassword);
  },
  comparePassword: async function(input) {
    console.log("THIS.GETPASSWORD AND INPUT:", this.get('password'), input);
    const match = await bcrypt.compare(input, this.get('password'));
    console.log("MATCH:", match);
    return match;
  },
  hashPassword: function() {
    const hasher = Promise.promisify(bcrypt.hash);
    return hasher(this.get('password'), 10).bind(this)
           .then(hash => {
              this.set('password', hash);
           })
           .catch(err => console.log(err));
  },
  school: function() {
    return this.belongsToMany(School);
  },
  bill_category_id: () => {
    return this.belongsToMany(BillCategory);
  },
  bill_payment_history: () => {
    return this.belongsToMany(BillPaymentHistory);
  }
})

module.exports = User