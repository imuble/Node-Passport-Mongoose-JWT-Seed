'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('./authenticate');
const signToken = require('./signToken');
const refreshToken = require('./refreshToken');
const constants = require('../../config/constants.config');
const verifyRefreshToken = require('./verifyRefreshToken');

module.exports = function () {

  router.post('/',
  authenticate,
  signToken,
  function (req, res) {
    if (req.user && req.data) return res.status(200).json(req.data);
    else return res.status(500).send();
  });


  router.get('/refresh', verifyRefreshToken, refreshToken, function (req, res) {
    if (req.data) {
      return res.status(200).json(req.data);
    }
    else return res.status(500).json({message: constants.httpResponseMessages.internalServerError});
  });
  return router;
};
