const userServices = require('../services/userServices');


async function login(req, res, next) {
  const response = await userServices.login(req.body, res, next); 
  res.json(response); 
}

async function register(req, res, next) {
  const response = await userServices.register(req.body, res, next);  
  res.json(response); 
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