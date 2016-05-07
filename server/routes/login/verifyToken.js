const jwt = require('jsonwebtoken');
var serverConfig = require('../../config/server.config');

module.exports = function (req, res, next) {
	if (!req.header('Authorization')) return res.status(401).json({message: 'Missing token'});
	jwt.verify(req.header('Authorization'), serverConfig.SECRET, function (err, verified) {
		if (err) return res.status(401).json({message: err.message});
		else {
			req.verified = verified;
			next();
		}
	});
};
