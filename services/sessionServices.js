const _ = require('lodash');
const Session = require('../models/sessionModel');
const Film = require('../models/filmModel');
const Cinema = require('../models/cinemaModel');
const SessionSeat = require('../models/sessionSeatModel');
const moment = require('moment');

const wrapper = promise => (
  promise
    .then(result => ({ result, error: null, isSuccessfully: true }))
    .catch(error => ({ error, result: null, isSuccessfully: false }))
)

function getAllSessions() {

}

async function formatSessionSeats(session, user) {
  session.sessionSeats = await session.sessionSeats.map((item) => {
    if (item.user_id) {   
       if (!item.user_id.equals(user._id) && item.chosen) {
        item.booked = true;
        item.chosen = false;
      }
    }
    return item
  });
  return ({session: session, isSuccessfully: true});
}

async function getSessionById(id, user) {
  if (id) {
    let session = await Session.findById(id)
    .populate({ path: 'film', select: 'film_info'})
    .populate({ 
      path: 'sessionSeats',
      populate: { path: 'seat_id'}
    })
    .populate({
      path: 'cinema',
    });
    session = await formatSessionSeats(session, user);
    return session;
  }
}

function createSessionSeatsInfo(cinema, sessionId) {
  const sessionSeats = [];
  cinema.seats.forEach(seat => {
    const sessionSeat = new SessionSeat();
    sessionSeat.seat_id = seat._id;
    sessionSeat.session_id = sessionId;
    sessionSeats.push(sessionSeat);
  });
  return sessionSeats;
}

function createSessionSeats(cinema, sessisonId) {
  const sessionSeats = createSessionSeatsInfo(cinema, sessisonId);
  SessionSeat.create(sessionSeats, (err, result) => {
    if (!err) {
      Session.findOneAndUpdate({_id: result[0].session_id}, {sessionSeats: result}, {new:true})
      .then((docs)=>{
        if(docs) {
          console.log({isSuccessfully: true, data:docs});
        } else {
          console.log({isSuccessfully: false, data:"no such sessison exist"});
        }
      }).catch((err)=>{
        console.log(err);
      });
      return;
    } else {
      console.log(err);
    } 
  }); 
}

function updateFilmInfo(filmId, sessionId) {
  Film.findOneAndUpdate({_id: filmId}, {$push: {sessions: sessionId}}, {new:true})
  .then((docs)=>{
    if(docs) {
      return docs;
    } else {
      console.log({isSuccessfully: false, data:"no such film exist"});
    }
  }).catch((err)=>{
    console.log(err);
  })
}

async function createSession(sessionInfo) {
  let cinema = await Cinema.findById({_id: sessionInfo.cinema});
  console.log(cinema);
  const newSession = new Session();
  newSession.film = sessionInfo.film;
  newSession.seatsAvailable = cinema.seatsAvailable;
  newSession.cinema = sessionInfo.cinema;
  newSession.date = sessionInfo.date;
  newSession.session_info = sessionInfo.session_info;
  let session = await Session.create(newSession);
  await updateFilmInfo(newSession.film, session._id);
  await createSessionSeats(cinema, session._id);
  return ({session: session, isSuccessfully: true});
}

async function updateSeatInfo (id, seatInfo, user) {
  let updatedSeat = await SessionSeat.findOneAndUpdate({_id: id, booked: false, $or: [ { user_id: null}, { user_id: user._id }, {chosen: false} ] }, {chosen: !seatInfo.chosen, user_id: user._id, lastSelectionDatetime: new Date()}, {new:true});
  if(updatedSeat) {
    const timeoutObj = setTimeout(async(id) => {
      let timeNow = new Date();
      let dateToCompare = moment(timeNow).subtract(30, 's').toDate();
      let result = await wrapper(SessionSeat.findOneAndUpdate({_id: id, lastSelectionDatetime: {$lte: dateToCompare},  booked: false}, {chosen: false, user_id: null}, {new: true}));
    }, 30 * 1000, id);
    return ({isSuccessfully: true, data:updatedSeat})
  } else {
    return ({isSuccessfully: false, data:"This seat has alredy booked"});
  }
}

async function bookSelectedSeats (seats, user) {
  let finalArray = seats.map(async (selectedSeat) => {
    let result = await wrapper(SessionSeat.findOneAndUpdate({_id: selectedSeat._id, booked: false}, {booked: true, chosen: false, user_id: user._id}));
    return result;
  });
  const resArray = await Promise.all(finalArray); 
  if (resArray.some((item) => item.isSuccessfully === false || !item.result)){
    return ({isSuccessfully: false})
  } else {
    let result = await wrapper(Session.findOneAndUpdate({_id: seats[0].session_id}, {$inc: {seatsAvailable: -seats.length}}));
    console.log(result);
    return result
  } 
}

async function removeBooking (seats) {
  let finalArray = seats.map(async (selectedSeat) => {
    let result = await wrapper(SessionSeat.findOneAndUpdate({_id: selectedSeat._id}, {chosen: false}));
    return result;
  });
  const resArray = await Promise.all(finalArray); 
  if (resArray.some((item) => item.isSuccessfully === false)){
    return ({isSuccessfully: false})
  } else {
    return ({isSuccessfully: true});
  } 
}

async function deleteAllSessions (id) {
  return  await wrapper(Film.findOneAndUpdate({_id: id}, {$unset: {sessions: 1 }}, {new: true}));
}

async function deleteSession(id) {
  let deletedSession = await wrapper(Session.findByIdAndDelete(id));
  if (deletedSession.result && deletedSession.isSuccessfully) {
    let deletedSessionFromFilm =  await deleteSessionFromFilmModel(deletedSession.result.film, deletedSession.result._id);
    if (deletedSessionFromFilm.isSuccessfully) {
      return await deleteSessionSeats(deletedSession.result.sessionSeats);
    }
  } else {
    return ({isSuccessfully: false, message: 'Nothing not found'});
  }
}

async function deleteSessionFromFilmModel(filmId, sessionId) {
  let result =  await wrapper(Film.findOneAndUpdate({_id: filmId}, { $pull: { sessions: sessionId} }, {new: true}));
  return result;
}

async function deleteSessionSeats(sessionSeats) {
  let deletedSessionSeatsArray = sessionSeats.map(async (sessionSeat) => {
    let result = await wrapper(SessionSeat.findByIdAndDelete(sessionSeat))
    return result;
  });
  const resArray = await Promise.all(deletedSessionSeatsArray); 
  if (resArray.some((item) => item.isSuccessfully === false)){
    return({isSuccessfully: false})
  } else {
    return({isSuccessfully: true});
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