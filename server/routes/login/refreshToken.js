const jwt = require('jsonwebtoken');
var serverConfig = require('../../config/server.config');
var User = require('../../models/user/user.model');
var constants = require('../../config/constants.config');
var signToken = require('./signToken');

module.exports = function (req, res, next) {
	User.findById(req.verified.id, function (err, user) {
		if (err) return res.status(500).send();
		if (!user) return res.status(404).send();
		if (req.verified.userVersion !== user.__v) return res.status(401).send();
		if (user.isBanned) return res.status(401).send();
		req.user = user;
		signToken(req, res, next);
	});
};
