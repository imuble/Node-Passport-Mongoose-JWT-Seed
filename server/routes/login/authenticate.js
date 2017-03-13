'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user/user.model');
const validator = require('validator');

passport.use('username', new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) return done('Incorrect username');
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

passport.use('email', new LocalStrategy(
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
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
  /*
  A user can authenticate with both email and username.
  The body-field named username can contain both email and a username,
  this explains this somewhat weird setup.
  */
  if (!req.body.password || !req.body.username) {
    return res.status(422).send();
  }

  if (validator.isEmail(req.body.username)) {
    passport.authenticate('email', function (err, user) {
      if (err) return res.status(401).send();
      else {
        req.logIn(user, {session: false}, next);
      }
    })(req, res, next);
  }
  else {
    passport.authenticate('username', function (err, user) {
      if (err) return res.status(401).send();
      else {
        req.logIn(user, {session: false}, next);
      }
    })(req, res, next);
  }
};
