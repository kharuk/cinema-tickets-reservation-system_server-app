//const User = require('../models/userModel');
const _ = require('lodash');
const sessions = require('../models/data.js');

function getAllSessions(req, res) {
  res.json({sessions, isSuccessfully: true});
}

function getSessionById(req, res) {
  if (req.params.id) {
    const session = _.find(sessions, {id: req.params.id});
    if (session) {
        res.json({session, isSuccessfully: true});
        return;
    } else {
      res.status(404).json({isSuccessfully: false});
    }
  }
}
/* function getFilm(req, res) {
   
}

function createFilm(req, res) {
   
}

function updateFilm(req, res) {
    
}

function deleteFilm(req, res) {
   
} */

module.exports = {
  getAllSessions,
  getSessionById
/*   getFilm,
  createFilm,
  updateFilm,
  deleteFilm */
};