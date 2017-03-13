'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user/user.model');
const requestValidator = require('./user-request-validate');
const uniqueValidator = require('./user-unique-validate');

module.exports = function () {
  router.post('/',
      requestValidator,
      uniqueValidator,
      function (req, res) {
        var newUser = new User({email: req.body.email, password: req.body.password});
        User.findOne({email: req.body.email}, function (err, user) {
          if (err) res.status(500).send();
          if (user) {
            if(user.email === newUser.email) return res.status(409).send('Email already in use');
            return res.status(409).send('Username already in use');
          } else {
            newUser.save(function(err){
              if (err) return res.status(500).send();
              res.status(201).json(newUser);
            });
          }
        });
      }
  );

  return router;
};
