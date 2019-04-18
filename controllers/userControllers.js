const userServices = require('../services/userServices');

function login(req, res, next) {
  userServices.login(req, res, next); 
}

function register(req, res, next) {
  userServices.register(req, res, next);   
}

function logout(req, res) {
  userServices.logout(req, res);  
}

function getPrivateInfo(req, res) {
  userServices.getPrivateInfo(req, res);  
}

module.exports = {
  logout,
  register,
  login,
  getPrivateInfo
};