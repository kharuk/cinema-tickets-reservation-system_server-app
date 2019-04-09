const sessionServices = require('../services/sessionServices');

function getAllSessions(req, res) {
  sessionServices.getAllSessions(req, res); 
}

function getSessionById(req, res) {
  sessionServices.getSessionById(req, res);
}

function createSession(req, res) {
  sessionServices.createSession(req, res);
}

function updateSeatInfo(req, res) {
  sessionServices.updateSeatInfo(req, res);
}


module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSeatInfo
};