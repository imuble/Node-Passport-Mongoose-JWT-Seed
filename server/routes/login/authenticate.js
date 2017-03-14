'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user/user.model');

passport.use('email', new LocalStrategy(
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) return done(err);
      if (!user) return done('Incorrect email');
      user.validPassword(password)
        .then(function (result) {
          if (result) return done(null, user);
          else done('Incorrect password');
        }).catch(function (err) {
          return done(err, null);
        });
    });
  }
));

module.exports = function (req, res, next) {
  if (!req.body.password) {
    return res.status(422).send();
  }

  passport.authenticate('email', function (err, user) {
    if (err) return res.status(401).send();
    else {
      req.logIn(user, {session: false}, next);
    }
  })(req, res, next);
};
