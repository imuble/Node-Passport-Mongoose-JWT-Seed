'use strict';

const jwt = require('jsonwebtoken');
const serverConfig = require('../../config/server.config');
const tokenConfig = require('../../config/token.config');
const tokenConstants = require('./token.constants');

module.exports = function (req, res, next) {
  let token = jwt.sign({
    id: req.user.id,
    userVersion: req.user.__v,
    privileges: req.user.privileges,
    type: tokenConstants.TYPES.ACCESS_TOKEN
  }, serverConfig.SECRET, {expiresIn: tokenConfig.ACCESS_TOKEN_EXPIRATIONTIME});

  let refreshToken = jwt.sign({
    id: req.user.id,
    userVersion: req.user.__v,
    privileges: req.user.privileges,
    type: tokenConstants.TYPES.REFRESH_TOKEN
  }, serverConfig.SECRET, {expiresIn: tokenConfig.REFRESH_TOKEN_EXPIRATONTIME});

  let data = {
    token: token,
    refreshToken: refreshToken
  };

  req.data = data;
  next();
};
