const _ = require('lodash');
const films = require('../models/data.js');
const Film = require('../models/filmModel');

function getAllFilms(req, res) {
  Film.find({})
  .populate({
    path: 'sessions',
    populate: { path: 'film', select: 'film_info'}
  }
  )
  .populate({
    path: 'sessions',
    populate: { path: 'cinema'}
  }
  )
  .exec( function(err, sessions) {
    if (!err) {
      res.json({sessions, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  })  
}

function getFilm(req, res) {
 /*   if (req.params.id) {
    const film = _.find(films, {film_id: req.params.id});
    if (film) {
        res.json({session: film, isSuccessfully: true});
        return;
    } else {
      res.status(404).json({isSuccessfully: false});
    }
  }  */
  if (req.params.id) {
    Film.findById(req.params.id)
    .populate({
      path: 'sessions',
      populate: { path: 'film', select: 'film_info'}
    })
    .populate({
      path: 'sessions',
      populate: { path: 'cinema'}
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
}

function createFilm(req, res) {
  Film.create(req.body, function (err, result) {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  });
}

function updateFilm(req, res) {
}

function deleteFilm(req, res) {
}

module.exports = {
  getAllFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm
};