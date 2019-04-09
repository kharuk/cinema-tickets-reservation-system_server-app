const _ = require('lodash');
//const sessions = require('../models/data.js');
const Session = require('../models/sessionModel');
const Film = require('../models/filmModel');
const Cinema = require('../models/cinemaModel');
const SessionSeat = require('../models/sessionSeatModel');

function getAllSessions(req, res) {
}

function getSessionById(req, res) {
  /* if (req.params.id) {
    let session =  _(sessions)
      .map('sessions')
      .flatten()
      .filter({id: req.params.id})
      .value()
    if (session) {
        session = _.head(session);
        res.json({session, isSuccessfully: true});
        return;
    } else {
      res.status(404).json({isSuccessfully: false});
    }
  } */
  if (req.params.id) {
    Session.findById(req.params.id)
    .populate({ path: 'film', select: 'film_info'})
    .populate({ 
      path: 'sessionSeats',
      populate: { path: 'seat_id'}
    })
    .populate({
      path: 'cinema',
     // populate: { path: 'seats'}
    })
    .exec( function(err, result) {
      if (!err) {
        _.forEach(result.sessionSeats, (sessionSeat)=> {
         // let session = _(sessionSeat)
       //   _.merge(sessionSeat, sessionSeat.seat_id)
         // .omit(sessionSeat, ['seat_id'])
         // .value();
         //delete sessionSeat.seat_id;
          //console.log(session);
        })
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
      // res.status(500).send(err)
    } 
  }); 
}

function updateFilmInfo(filmId, sessionId) {
  Film.findOneAndUpdate({_id: filmId}, {$push: {sessions: sessionId}}, {new:true})
  .then((docs)=>{
    if(docs) {
     // console.log({isSuccessfully: true, data:docs});
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
          updateFilmInfo(newSession.film, sessison._id);
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
  console.log(req.body.booked);
  console.log(req.params);
  const seatId = req.params.id;
  SessionSeat.findOneAndUpdate({_id: req.params.id}, {booked: !req.body.booked}, {new:true})
  .then((docs)=>{
    if(docs) {
      //console.log({isSuccessfully: true, data:docs});
      res.json({isSuccessfully: true, data:docs})
    } else {
      console.log({isSuccessfully: false, data:"no such film exist"});
    }
  }).catch((err)=>{
    console.log(err);
  })
}

module.exports = {
  getAllSessions,
  getSessionById, 
  createSession,
  updateSeatInfo
};