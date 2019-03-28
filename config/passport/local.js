const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/userModel');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => { 
    try {
      const {firstName, lastName, location, gender, /* email,  password*/} = req.body;
      const user = await User.findOne({'email': email});
      if (user) return done(null, false, {message: 'That email is already taken.'});

      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.hashPassword =newUser.generateHash(password);
      newUser.location = location;
      newUser.gender = gender;
      const save = await newUser.save();
      if (!save) {
        return done(null, newUser, { message: 'Error with connection' });
      } else {
        return done(null, newUser, { message: 'Saved', user: newUser.returnUserInfo()});
      }
    } catch (error) {
      console.log(error);
      return done(null, false, {success: false, message: 'Registration failed.'});
    }
  }));


passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({'email': email});

      if (!user || !user.validatePassword(password))
        return done(null, false,  {success: false, message: 'Email or password is invalid'});
      return done(null, user, {success: true, message: 'Success' });

    } catch (error) {
      return done(error, false, {success: false, message: 'Authentication failed.'})
    }
  }));