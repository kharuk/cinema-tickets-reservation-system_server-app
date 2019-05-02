const filmServices = require('../services/filmServices');

function getAllFilms(req, res) {
  filmServices.getAllFilms(req, res); 
}

function getFilm(req, res) {
  filmServices.getFilm(req, res);   
}

function createFilm(req, res) {
  filmServices.createFilm(req, res);  
}

function updateFilm(req, res) {
  filmServices.updateFilm(req, res);  
}

function deleteFilm(req, res) {
  filmServices.deleteFilm(req, res);  
}

async function deleteFilm(req, res, next) {
  try {
    const { id } = req.params;
    let deletedFilm =  await filmServices.deleteFilm(id);
    res.json(deletedFilm);
  } catch(err) {
    next(err);
  } 
}

module.exports = {
  getAllFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm
};