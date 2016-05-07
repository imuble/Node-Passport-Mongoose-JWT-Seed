var validator = require('validator');

module.exports = function (req, res, next) {
	if (!req.body.username || !req.body.email || !req.body.password) {
		res.status(400);
		return res.json({message: 'Invalid request parameters'});
	}
	if (!validator.isEmail(req.body.email)) {
		res.status(400);
		return res.json({message: 'The email field must contain a valid email address'});
	}

	next();
};