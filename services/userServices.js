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
        console.log('err');
        result = next(err) 
    } else if (!user) {
      console.log('!user');
        result = res.json({
            message: info.message,
            isSuccessfully: info.success
        })
    } else {
      const token = tokenMiddleware.generateToken(user.id);
      
      result = res.cookie('token', token).json({
          token: token,
          user: user.returnUserInfo(),
          message: info.message,
          isSuccessfully: info.success
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
  //console.log("logout");
  res.clearCookie('token');
  res.status(204).send();
}

module.exports = {
  register,
  login,
  getPrivateInfo,
  logout
};
