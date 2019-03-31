const sessionServices = require('../services/sessionServices');

function getAllSessions(req, res) {
  sessionServices.getAllSessions(req, res); 
}

function getSessionById(req, res) {
  sessionServices.getSessionById(req, res);
}

/* function getFilm(req, res) {
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
} */

module.exports = {
  getAllSessions,
  getSessionById
/*   getFilm,
  createFilm,
  updateFilm,
  deleteFilm */
};