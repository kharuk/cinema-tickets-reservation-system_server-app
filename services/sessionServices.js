const _ = require('lodash');
//const sessions = require('../models/data.js');
const Session = require('../models/sessionModel');
const Film = require('../models/filmModel');
const Cinema = require('../models/cinemaModel');

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
      newSession.sessionSeats = cinema.seats;
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


module.exports = {
  getAllSessions,
  getSessionById, 
  createSession
};