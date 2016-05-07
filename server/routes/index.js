var express = require('express');
var router = express.Router();
var loginRouter = require('./login/login.route');
var userRouter = require('./user/user.route');

module.exports = function () {
	router.get('/', function (req, res) {
		res.send('Welcome');
	});
	router.use('/', loginRouter());
    router.use('/', userRouter());
	return router;
};
