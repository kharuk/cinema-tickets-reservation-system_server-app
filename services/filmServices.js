const Film = require('../models/filmModel');
const sessionServices = require('./sessionServices');

const wrapper = promise => (
  promise
    .then(result => ({ result, error: null, isSuccessfully: true }))
    .catch(error => ({ error, result: null, isSuccessfully: false }))
)

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
  let film = {};
  film.film_info = {
    filmName: req.body.name,
    description: req.body.description,
    poster_path: req.body.imagePath
  }
  Film.create(film, function (err, result) {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  });
}

async function updateFilm(req, res) {
   let result = await wrapper(Film.findOneAndUpdate({_id: req.params.id}, {film_info: req.body.film_info}, {new:true}));
   if (result.error) {
    result.message = "no such film exist";
    res.json(result); 
   }
  res.json(result);
}

async function deleteFilm(id) {
  let deletedFilm = await wrapper(Film.findByIdAndDelete(id));
  if (deletedFilm.result && deletedFilm.isSuccessfully) {
    let deletedSessions = deletedFilm.result.sessions.map(async (session) => {
      return await sessionServices.deleteSession(session);
    });
    const resArray = await Promise.all(deletedSessions); 
    if (resArray.some((item) => item.isSuccessfully === false)){
      return({isSuccessfully: false})
    } else {
      return({isSuccessfully: true});
    }  
  } else {
    return ({isSuccessfully: false, message: 'Nothing not found'})
  }
}

module.exports = {
  getAllFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm
};