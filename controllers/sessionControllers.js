const sessionServices = require('../services/sessionServices');

async function getAllSessions(req, res, next) {
  try {
    let recievedSessions =  await sessionServices.getAllSessions(); 
    res.json(recievedSessions)
  } catch(err) {
    next(err);
  } 
}

async function getSessionById(req, res, next) {
  try {
    const { id } = req.params;
    let recievedSessionById =  await sessionServices.getSessionById(id, req.user);
    res.json(recievedSessionById)
  } catch(err) {
    next(err);
  }   
}

async function createSession(req, res, next) {
  try {
    let createdSession =  await sessionServices.createSession(req.body);
    res.json(createdSession)
  } catch(err) {
    next(err);
  }     
}

async function updateSeatInfo(req, res, next) {
  try {
    const { id } = req.params;
    let updatedSeatInfo =  await sessionServices.updateSeatInfo(id, req.body, req.user);
    res.json(updatedSeatInfo)
  } catch(err) {
    next(err);
  }   
}

async function bookSelectedSeats(req, res, next) {
  try {
    let bookedSeats =  await sessionServices.bookSelectedSeats(req.body, req.user);
    res.json(bookedSeats)
  } catch(err) {
    next(err);
  }   
}

async function removeBooking(req, res, next) {
  try {
    let removedBooking =  await sessionServices.removeBooking(req.body);
    res.json(removedBooking)
  } catch(err) {
    next(err);
  }  
}

async function deleteAllSessions(req, res, next) {
  try {
    const { id } = req.params;
    let deletedSessions =  await sessionServices.deleteAllSessions(id);
    res.json(deletedSessions)
  } catch(err) {
    next(err);
  }   
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