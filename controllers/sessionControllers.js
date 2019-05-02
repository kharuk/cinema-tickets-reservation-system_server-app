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

function bookSelectedSeats(req, res) {
  sessionServices.bookSelectedSeats(req, res);
}

function removeBooking(req, res) {
  sessionServices.removeBooking(req, res);
}

function deleteAllSessions(req, res) {
  sessionServices.deleteAllSessions(req, res);
}

async function deleteSession(req, res, next) {
  try {
    const { id } = req.params;
    let deletedSession =  await sessionServices.deleteSession(id);
    res.json(deletedSession)
  } catch(err) {
    next(err);
  } 
}




module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSeatInfo,
  bookSelectedSeats,
  removeBooking,
  deleteAllSessions,
  deleteSession
};