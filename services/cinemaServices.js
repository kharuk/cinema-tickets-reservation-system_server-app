const _ = require('lodash');
const Cinema = require('../models/cinemaModel');
const Seats = require('../models/seatModel');
const Session = require('../models/sessionModel');

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
  let result = await wrapper(Cinema.findOneAndUpdate({_id: req.params.id}, {film_info: req.body.film_info}, {new:true}));
  if (result.error) {
   result.message = "no such film exist";
   res.json(result); 
  }
  res.json(result);
}

async function deleteCinema(req, res) {
  let result = await wrapper(Cinema.deleteOne({ _id: req.params.id }));
  if (!result.error) {
    let isSeatsDeleted = await deleteCinemaSeats(req.params.id);
    //console.log(isSeatsDeleted);
    let isSessionDeleted = await deleteSession(req.params.id);

    //console.log(isSessionDeleted);
    res.json(result);
  }
  result.message = "no such cinema exist";
  res.json(result);
  
}


async function deleteCinemaSeats(cinemaId) {
  let result = await wrapper(Seats.deleteMany({ cinema_id: cinemaId }));
  console.log('deleteCinemaSeats', result);
  return result
}

async function deleteSession(cinemaId) {
  let result = await wrapper(Session.remove({ cinema: cinemaId }));
  console.log('deleteSession', result);
  return result
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