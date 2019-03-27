//const passport = require('passport');
const db = require('../config/dbConfig');
const User = require('../models/userModel');

function register(req, res, next) {
  const {firstName, lastName, email, password, location, gender} = req.body;
  User.findOne({email : email }, function (err, user){
    if (user){
      res.status(400).send({ message: `user with email: ${email} is already exist`})
    } else { 
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
            next(err);
          }
          else {
            res.send({user: user.returnUserInfo()});
          }
        }
      );
    }
  }); 
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
