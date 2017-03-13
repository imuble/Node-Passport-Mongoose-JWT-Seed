'use strict';

const jwt = require('jsonwebtoken');
const serverConfig = require('../../config/server.config');
const tokenConstants = require('./token.constants');

module.exports = function (req, res, next) {
  if (!req.header('Authorization')) return res.status(401).json({message: 'Missing token'});
  jwt.verify(req.header('Authorization'), serverConfig.SECRET, function (err, verified) {
    if (err) return res.status(401).json({message: err.message});
    if (verified.type === tokenConstants.TYPES.REFRESH_TOKEN) return res.status(401).json({message: 'A refresh token can not be used as an access token.'});
    else {
      req.verified = verified;
      next();
    }
  });
};
