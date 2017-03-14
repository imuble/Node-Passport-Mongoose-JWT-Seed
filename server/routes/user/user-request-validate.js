'use strict';

const validator = require('validator');

module.exports = function (req, res, next) {
  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    return res.json({message: 'The email field must contain a valid email address'});
  }

  next();
};
