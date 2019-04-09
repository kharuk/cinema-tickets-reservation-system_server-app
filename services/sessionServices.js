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
    .populate({ path: 'sessionSeats'})
    .populate({
      path: 'cinema',
      populate: { path: 'seats'}
    })
    .exec( function(err, result) {
      if (!err) {
        res.json({session: result, isSuccessfully: true});
        return;
      } else {
        console.log(err);
        res.status(500).send(err)
      } 
    }) 
  }

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

     /*  const sessionSeats = [];
      cinema.seats.forEach(seat => {
        const sessionSeat = new SessionSeat();
        sessionSeat.seat_id = seat._id;
        sessionSeats.push(sessionSeat);
      });
      
      SessionSeat.create(sessionSeats, function (err, result) {
        if (!err) {
         // res.json({result, isSuccessfully: true});
         console.log('session seats', result);
          newSession.sessionSeats = result;
          return;
        } else {
          console.log(err);
         // res.status(500).send(err)
        } 
      });
 */
      const save = newSession.save();
      if (save) {
        Film.findOneAndUpdate({_id: newSession.film}, {$push: {sessions: newSession._id}}, {new:true})
        .then((docs)=>{
          if(docs) {
            console.log({isSuccessfully: true, data:docs});
          } else {
            console.log({isSuccessfully: false, data:"no such film exist"});
          }
        }).catch((err)=>{
          console.log(err);
        })

        
        res.json({newSession, isSuccessfully: true});
        return;
      } else {
        console.log(err);
        res.status(500).send(err)
      } 
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
 // const seatsQuery = ``;

  var seatSelector = {};
  var seatSelection = `sessionSeat.${seatId}.booked`;
  // Part of $and query to check if seat is free
  seatSelector[seatSelection] = !req.body.booked;
 // seatsQuery.push(seatSelector);
  // Part of $set operation to set seat as occupied
  //setSeatsSelection[seatSelection] = 1;  

console.log('seatSelector', seatSelector)
/*   Session.findOneAndUpdate({_id: req.params.id}, {$set: seatSelector},{new:true}, function(err, doc) {
      
    if (!err){
      console.log('doc', doc);
    } else {
      console.log(err);
    }
  });
 */
  Session.findById(req.params.session_id)
    .populate({ path: 'sessionSeats'})
    //.findOne({'sessionSeats._id': seatId})
    .update({'sessionSeats._id': seatId}, {$set: {'sessionSeats.$.booked': !req.body.booked}})
   // .findOne({'sessionSeats._id': seatId})
   /*  .update( 
      {'sessionSeats._id': seatId},
      {$set: {'sessionSeats.$.booked': !req.body.booked}}
    ) */
    .exec( function(err, result) {
      if (!err) {
       // res.json({session: result, isSuccessfully: true});
       console.log(result);
        return;
      } else {
        console.log(err);
      //  res.status(500).send(err)
      } 
    }) 
 
/*   Model.update(
    { 'pdfs.pdf_id': pdf_id }, 
    { $set: { 
        'pdfs.$.title': title, 
        'pdfs.$.description': description 
    }}, function (err, numAffected) { ... }
); */
 /*  User.findOne({username: oldUsername}, function (err, user) {
    user.username = newUser.username;
    user.password = newUser.password;
    user.rights = newUser.rights;

    user.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
    });
}); */
}

module.exports = {
  getAllSessions,
  getSessionById, 
  createSession,
  updateSeatInfo
};