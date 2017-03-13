'use strict';

const User = require('../../models/user/user.model');

module.exports = function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).json({message: 'Internal server error'});
    if (user) {
      if (user.email === req.body.email) return res.status(409).json({message: 'Email already exists'});
    }
    next();
  });
};
