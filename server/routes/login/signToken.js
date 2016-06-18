const jwt = require('jsonwebtoken');
var serverConfig = require('../../config/server.config');
var tokenConfig = require('../../config/token.config');
var tokenConstants = require('./token.constants');

module.exports = function (req, res, next) {
	var token = jwt.sign({
		id: req.user.id,
		userVersion: req.user.__v,
		privileges: req.user.privileges,
		type: tokenConstants.TYPES.ACCESS_TOKEN
	}, serverConfig.SECRET, {expiresIn: tokenConfig.ACCESS_TOKEN_EXPIRATIONTIME});

	var refreshToken = jwt.sign({
		id: req.user.id,
		userVersion: req.user.__v,
		privileges: req.user.privileges,
		type: tokenConstants.TYPES.REFRESH_TOKEN
	}, serverConfig.SECRET, {expiresIn: tokenConfig.REFRESH_TOKEN_EXPIRATONTIME});

	var data = {
		token: token,
		refreshToken: refreshToken
	};

	req.data = data;
	next();
};
