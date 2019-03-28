const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({'email': email});

      if (user) {
        return done(null, false, { message: `Email ${email} is already exist` });
      } else {
        const newUser = new User();
        // I need to add validation
        const {firstName, lastName, location, gender} = req.body;
        newUser = {
          firstName,
          lastName,
          email,
          hashPassword: newUser.generateHash(password),
          location,
          gender
        }
       // newUser.email = email;
        //newUser.password = newUser.generateHash(password);
        const save = await newUser.save();
        if (!save) {
          return done(null, newUser, { message: 'Error with connection' })
        } else {
          return done(null, newUser, { message: ''})
        }

      }
    } catch (error) {
      done(error, false,  { message: 'Internal error' })
    }
  }));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({'email': email});

      if (!user)
        return done(null, false,  { message: `User with email ${email} is not exist` });
      if (!user.validatePassword(password))
        return done(null, false, { message: `Wrong password for ${email}` });
      return done(null, user, { name: user.firstName, message: 'Success' });

    } catch (error) {
      done(error, false, { message: 'Internal error' })
    }
  }));
