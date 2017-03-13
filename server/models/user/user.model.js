'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const uniqueValidator = require('mongoose-unique-validator');

Promise.promisifyAll(bcrypt);

let userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, function (err, hash) {
    if (err) throw new Error(err);
    else {
      this.password = hash;
      next();
    }
  }.bind(this));
});

userSchema.plugin(uniqueValidator);

userSchema.methods.validPassword = function (password) {
  return bcrypt
  .compareAsync(password, this.password)
  .then(function (result, err) {
    if (err) throw new Error(err);
    return result;
  });
};

module.exports = mongoose.model('user', userSchema);
