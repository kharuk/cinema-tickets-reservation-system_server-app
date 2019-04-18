const _ = require('lodash');
const Cinema = require('../models/cinemaModel');
const Seats = require('../models/seatModel');

function getAllCinemas(req, res) {
  
}

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

function updateCinema(req, res) {
    
}

function deleteCinema(req, res) {
   
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