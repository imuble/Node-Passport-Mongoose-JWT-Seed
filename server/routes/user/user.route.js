var express = require('express');
var router = express.Router();
var User = require('../../models/user/user.model');
var requestValidator = require('./user-request-validate');
var uniqueValidator = require('./user-unique-validate');
var validator = require('validator');
var verifyToken = require('../login/verifyToken');

module.exports = function () {
    router.post('/',
        requestValidator,
        uniqueValidator,
        function (req, res) {
            var newUser = new User({username: req.body.username, email: req.body.email, password: req.body.password});
            User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, function (err, user) {
                if(err) res.status(500).send();
                if (user) {
                    if(user.email === newUser.email) return res.status(409).send('Email already in use');
                    return res.status(409).send('Username already in use');
                }
                else
                {
                    newUser.save(function(err){
                        if (err) return res.status(500).send();
                        res.status(201).json(newUser);
                    });
                }
            });
        }
    );
    
    return router;
};