//const passport = require('passport');
const db = require('../config/dbConfig');
const User = db.User;

function register(req, res, next) {
  const {firstName, lastName, email, password, location, gender} = req.body;

  User.create(
    {
      firstName,
      lastName,
      email,
      hashPassword: password,
      location,
      gender
    },
    (err, user) => {
      if (err){
       // res.status(400).json({ message: `user with email: ${email} is already exist`});
        next(err);
      }
      else {
        res.send({user: user.toAuthJSON()});
      }
    }
  );

  
}

function login(req, res, next) {

}

function getPrivateInfo(req, res) {

}

function logout(req, res) {

}

module.exports = {
  register,
  login,
  getPrivateInfo,
  logout
};
