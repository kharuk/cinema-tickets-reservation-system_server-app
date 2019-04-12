const _ = require('lodash');
//const sessions = require('../models/data.js');
const Session = require('../models/sessionModel');
const Film = require('../models/filmModel');
const Cinema = require('../models/cinemaModel');
const SessionSeat = require('../models/sessionSeatModel');
const moment = require('moment');

function getAllSessions(req, res) {

}


function getSessionById(req, res) {
  if (req.params.id) {
    Session.findById(req.params.id)
    .populate({ path: 'film', select: 'film_info'})
    .populate({ 
      path: 'sessionSeats',
      populate: { path: 'seat_id'}
    })
    .populate({
      path: 'cinema',
    })
    .exec( function(err, result) {
      if (!err) {
        result.sessionSeats = result.sessionSeats.map((item) => {
          if (item.user_id) {   
             if (!item.user_id.equals(req.user._id) && item.chosen) {
              item.booked = true;
              item.chosen = false;
            }
          }
          return item
        });
        res.json({session: result, isSuccessfully: true});
        return;
      } else {
        console.log(err);
        res.status(500).send(err)
      } 
    }) 
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
          console.log({isSuccessfully: false, data:"no such sesison exist"});
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
 // return Film.findOneAndUpdate({_id: filmId}, {$push: {sessions: sessionId}}, {new:true})
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



function createSession(req, res) {
  Cinema.findById({_id: req.body.cinema}, function (err, cinema) {
    if (!err) {
      const newSession = new Session();
      newSession.film = req.body.film;
      newSession.seatsAvailable = cinema.seatsAvailable;
      newSession.cinema = req.body.cinema;
      newSession.date = req.body.date;
      newSession.session_info = req.body.session_info;
      Session.create(newSession, function(err, sessison) {
        if(!err) {
        //  updateFilmInfo(newSession.film, sessison._id).then(docs => {});
          updateFilmInfo(newSession.film, sessison._id)
          res.json({session: sessison, isSuccessfully: true});
          createSessionSeats(cinema, sessison._id);
          return;
        } else {
          console.log(err);
        }
      });
    }
    else {
      console.log(err);
      res.status(500).send(err)
    } 
  });
}

function updateSeatInfo (req, res) {
  SessionSeat.findOneAndUpdate({_id: req.params.id, booked: false, $or: [ { user_id: null}, { user_id: req.user._id }, {chosen: false} ] }, {chosen: !req.body.chosen, user_id: req.user._id, lastSelectionDatetime: new Date()}, {new:true})
  .then((docs)=>{
    if(docs) {
      const timeoutObj = setTimeout(async(id) => {
        let timeNow = new Date();
        let dateToCompare = moment(timeNow).subtract(30, 's').toDate();
        let result = await wrapper(SessionSeat.findOneAndUpdate({_id: id, lastSelectionDatetime: {$lte: dateToCompare},  booked: false}, {chosen: false, user_id: null}, {new: true}));
      }, 30 * 1000, req.params.id);
      res.json({isSuccessfully: true, data:docs})
    } else {
      res.json({isSuccessfully: false, data:"This seat has alredy booked"});
    }
  }).catch((err)=>{
    console.log(err);
  })
}

const wrapper = promise => (
  promise
    .then(seat => ({ seat, error: null, isSuccessfully: true }))
    .catch(error => ({ error, seat: null, isSuccessfully: false }))
)

async function bookSelectedSeats (req, res) {
  let finalArray = req.body.map(async (selectedSeat) => {
    let result = await wrapper(SessionSeat.findOneAndUpdate({_id: selectedSeat._id, booked: false}, {booked: true, chosen: false, user_id: req.user._id}));
    return result;
  });
  const resArray = await Promise.all(finalArray); 
  if (resArray.some((item) => item.isSuccessfully === false || !item.seat)){
    res.json({isSuccessfully: false})
  } else {
    res.json({isSuccessfully: true});
  }
}

async function removeBooking (req, res) {
  let finalArray = req.body.map(async (selectedSeat) => {
    let result = await wrapper(SessionSeat.findOneAndUpdate({_id: selectedSeat._id}, {chosen: false}));
    return result;
  });
  const resArray = await Promise.all(finalArray); 
  if (resArray.some((item) => item.isSuccessfully === false)){
    res.json({isSuccessfully: false})
  } else {
    res.json({isSuccessfully: true});
  } 
}

module.exports = {
  getAllSessions,
  getSessionById, 
  createSession,
  updateSeatInfo,
  bookSelectedSeats,
  removeBooking
};