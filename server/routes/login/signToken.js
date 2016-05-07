const jwt = require('jsonwebtoken');
var serverConfig = require('../../config/server.config');

module.exports = function (req, res, next) {
	var token = jwt.sign({
		id: req.user.id,
		userVersion: req.user.userVersion,
		expiresIn: 60 * 60 * 12
	}, serverConfig.SECRET);

	var data = {
		token: token,
		id: req.user.id,
		expiresIn: Date.now() + (60 * 60 * 12 * 1000)
	};

	req.data = data;
	next();
};
