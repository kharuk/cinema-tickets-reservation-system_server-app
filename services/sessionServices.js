//const User = require('../models/userModel');
const _ = require('lodash');
const sessions = require('../models/data.js');

function getAllSessions(req, res) {
  res.json({sessions, isSuccessfully: true});
}

function getSessionById(req, res) {
  if (req.params.id) {
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
  }
}


module.exports = {
  getAllSessions,
  getSessionById
};