var express = require('express');
var router = express.Router();
var authenticate = require('./authenticate');
var signToken = require('./signToken');
var refreshToken = require('./refreshToken');
var verifyRefreshToken = require('./verifyRefreshToken');
var verifyToken = require('./verifyToken');

module.exports = function () {

    router.post('/',
        authenticate,
        signToken,
        function (req, res) {
			if (req.user && req.data) return res.status(200).json(req.data);
			else return res.status(500).send();
		}
    );


    router.get('/refresh', verifyRefreshToken, refreshToken, function (req, res) {
		if (req.data) {
			return res.status(200).json(req.data);
		}
		else return res.status(500).json({message: constants.httpResponseMessages.internalServerError});
	});
    return router;
};