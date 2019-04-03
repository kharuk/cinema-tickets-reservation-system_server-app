const sessionServices = require('../services/sessionServices');

function getAllSessions(req, res) {
  sessionServices.getAllSessions(req, res); 
}

function getSessionById(req, res) {
  sessionServices.getSessionById(req, res);
}


module.exports = {
  getAllSessions,
  getSessionById
};