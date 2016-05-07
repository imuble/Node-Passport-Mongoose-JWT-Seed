var User = require('../../models/user/user.model');

module.exports = function (req, res, next) {
	/*
	TODO: find a more efficient way.
	 */
	User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, function (err, user) {
		if (err) return res.status(500).json({message: 'Internal server error'});
		if (user) {
			if (user.username === req.body.username) return res.status(409).json({message: 'Username already exists'});
			if (user.email === req.body.email) return res.status(409).json({message: 'Email already exists'});
		}
		next();
	});
};
