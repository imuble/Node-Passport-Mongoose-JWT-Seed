'use strict';

const express = require('express');
const router = express.Router();
const loginRouter = require('./login/login.route');
const userRouter = require('./user/user.route');

module.exports = function () {
  router.get('/', function (req, res) {
    res.send('Welcome');
  });
  router.use('/login', loginRouter());
  router.use('/user', userRouter());
  return router;
};
