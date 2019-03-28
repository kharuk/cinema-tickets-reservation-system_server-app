const passport = require('passport');
const User = require('../models/userModel');
const tokenMiddleware = require('../middlewares/passportMiddleware');

const register = async (req, res, next) => {
  await passport.authenticate('local-signup', {session: false},  function(err, user, info) {
    let result;
    if (err) { 
      result =  next(err) 
    } else if (!user) { 
      result = res.json({
          message: info.message
      })
    } else {
      result = res.json({
          message: info.message
      })
    }
    return result;
  })(req, res, next)  
};

const login = async (req, res, next) => {
  await passport.authenticate('local-login',{session: false},  function(err, user, info) {
    let result;
    if (err) { 
        result = next(err) 
    } else if (!user) {
        result = res.json({
            message: info.message
        })
    } else {
      const token = tokenMiddleware.generateToken(user.id);
      res.cookie('token', token);
      result = res.json({
          user: user.returnUserInfo(),
          message: info.message
      })
    }
    return result;
  })(req, res, next)
};

function getPrivateInfo(req, res) {
  const {id} = req.user;
  return User.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(404);
    }

    return res.json({user: user.returnUserInfo()});
  });

}

function logout(req, res) {

}

module.exports = {
  register,
  login,
  getPrivateInfo,
  logout
};
