const passport = require('passport');
const jwt = require('express-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

const getTokenFromCookies = (req) => {
  const token = req.cookies['token'];
  return token || null;
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({email})
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {error: { message: 'Email or password is invalid'}});
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);

module.exports = {
  required: jwt({
    secret: 'secret',
    userProperty: 'user',
    getToken: getTokenFromCookies
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'user',
    getToken: getTokenFromCookies,
    credentialsRequired: false
  })
};
