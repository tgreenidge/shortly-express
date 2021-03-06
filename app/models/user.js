var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function (){
    this.on('creating', this.signUp);
  },

  authenticate: function (pwAttempt) {
    bcrypt.compareSync(pwAttempt, this.get('password'));
  },

  signUp: function (model, attributes, options) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(attributes.password, salt);
    model.set('password', hash);
  }
});



module.exports = User;
