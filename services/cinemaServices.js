const _ = require('lodash');
const Cinema = require('../models/cinemaModel');
const Seats = require('../models/seatModel');
const Session = require('../models/sessionModel');
const sessionServices = require('./sessionServices');

function getAllCinemas(req, res) {
  Cinema.find({})
  .populate({
    path: 'seats'
  })
  .exec( function(err, result) {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  }) 
}

const wrapper = promise => (
  promise
    .then(result => ({ result, error: null, isSuccessfully: true }))
    .catch(error => ({ error, result: null, isSuccessfully: false }))
)

function getCinema(req, res) {
  Cinema.findById(req.params.id)
  .populate({
    path: 'seats'
  })
  .exec( function(err, result) {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  }) 
}

function createCinema(req, res) {
  Cinema.create(req.body, function (err, result) {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  });
}

async function updateCinema(req, res) {
  let result = await wrapper(Cinema.findOneAndUpdate({_id: req.params.id}, {cinemaName: req.body.cinemaName, location: req.body.location}, {new:true}));
  if (result.error) {
   result.message = "no such cinema exist";
   res.json(result); 
  }
  res.json(result);
}

async function deleteCinema(id) {
   let deletedCinema = await wrapper(Cinema.findByIdAndDelete(id));
  if (deletedCinema.result && deletedCinema.isSuccessfully) {
    let resultArray = [];
    resultArray.push(await deleteCinemaSeats(id));
    resultArray.push(deleteSessions(id));
   // return await sessionServices.deleteSession(session);
    const resArray = await Promise.all(resultArray); 
    console.log('resArray', resArray);
    if (resArray.some((item) => item.isSuccessfully === false)){
      return({isSuccessfully: false})
    } else {
      return({isSuccessfully: true});
    } 
  } else {
    return ({isSuccessfully: false, message: 'Nothing not found'});
  }  
}


async function deleteCinemaSeats(cinemaId) {
  let result = await wrapper(Seats.deleteMany({ cinema_id: cinemaId }));
  console.log('deleteCinemaSeats', result);
  return result
}

async function deleteSessions(cinemaId) {
  let sessionsResult = await wrapper(Session.find({ cinema: cinemaId }));
  let deletedSessionsArray = sessionsResult.result.map(async (session) => {
    return await sessionServices.deleteSession(session._id)
  });
   const resArray = await Promise.all(deletedSessionsArray); 
  if (resArray.some((item) => item.isSuccessfully === false)){
    return({isSuccessfully: false})
  } else {
    return({isSuccessfully: true});
  } 
}



function createSeats(req, res) {
  let seatsArray =  req.body;
  Seats.create(seatsArray, function (err, result) {
    if (!err) {
      result.forEach(seat => {
        Cinema.findOneAndUpdate({_id: seat.cinema_id}, {$push: {seats: seat._id}, $inc: {seatsAvailable: 1}}, {new:true})
        .then((docs)=>{
          if(docs) {
            console.log({isSuccessfully: true, data:docs});
          } else {
            console.log({isSuccessfully: false, data:"no such cinema exist"});
          }
        }).catch((err)=>{
          console.log(err);
        })
      });
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  }); 
}

module.exports = {
  getAllCinemas,
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema,
  createSeats
};