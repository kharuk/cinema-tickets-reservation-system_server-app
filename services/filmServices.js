const Film = require('../models/filmModel');

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

async function updateFilm(req, res) {
   let result = await wrapper(Film.findOneAndUpdate({_id: req.params.id}, {film_info: req.body.film_info}, {new:true}));
   if (result.error) {
    result.message = "no such film exist";
    res.json(result); 
   }
  res.json(result);
}

async function deleteFilm(req, res) {
  let result = await wrapper(Film.deleteOne({ _id: req.params.id }));
  res.json(result);
}

module.exports = {
  getAllFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm
};