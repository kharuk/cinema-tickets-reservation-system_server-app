const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/userModel');
const configAuth =  {
  JWT: {
    secret: "qwerty",
    live: process.env.JWT_LIVE
  }
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configAuth.JWT.secret
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error, false)
  }
}));