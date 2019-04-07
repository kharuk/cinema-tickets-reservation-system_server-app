//const User = require('../models/userModel');
const _ = require('lodash');
const sessions = require('../models/data.js');
const Session = require('../models/sessionModel');
const Film = require('../models/filmModel');

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

function createSession(req, res) {
  Session.create(req.body, function (err, result) {
    if (!err) {
      Film.findOneAndUpdate({_id: result.film}, {$push: {sessions: result._id}}, {new:true})
      .then((docs)=>{
        if(docs) {
          console.log({success:true,data:docs});
        } else {
          console.log({success:false,data:"no such user exist"});
        }
      }).catch((err)=>{
        console.log(err);
      })
       /*  if(!err){
         
          res.json()
        } */
/*         console.log(err)
        console.log(res)
      }) */
      res.json({result, isSuccessfully: true});
      return;
    } else {
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