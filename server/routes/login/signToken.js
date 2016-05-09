const jwt = require('jsonwebtoken');
var serverConfig = require('../../config/server.config');

module.exports = function (req, res, next) {
	var token = jwt.sign({
		id: req.user.id,
		userVersion: req.user.userVersion,
	}, serverConfig.SECRET, {expiresIn: serverConfig.TOKEN.EXPIRATION_TIME}
);

	var data = {
		token: token,
	};

	req.data = data;
	next();
};
