//const User = require('../models/userModel');
const _ = require('lodash');
const films = require('../models/data.js');
function getAllFilms(req, res) {
  
}

function getFilm(req, res) {
  if (req.params.id) {
    const film = _.find(films, {film_id: req.params.id});
    if (film) {
        res.json({session: film, isSuccessfully: true});
        return;
    } else {
      res.status(404).json({isSuccessfully: false});
    }
  }
}

function createFilm(req, res) {
   
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