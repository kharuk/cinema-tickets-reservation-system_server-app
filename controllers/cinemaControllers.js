const cinemaServices = require('../services/cinemaServices');

function getAllCinemas(req, res) {
  cinemaServices.getAllCinemas(req, res); 
}

function getCinema(req, res) {
  cinemaServices.getCinema(req, res);   
}

function createCinema(req, res) {
  cinemaServices.createCinema(req, res);  
}

function updateCinema(req, res) {
  cinemaServices.updateCinema(req, res);  
}


async function deleteCinema(req, res, next) {
  try {
    const { id } = req.params;
    let deletedCinema =  await cinemaServices.deleteCinema(id);
    res.json(deletedCinema);
  } catch(err) {
    next(err);
  } 
}

function createSeats(req, res) {
  cinemaServices.createSeats(req, res);  
}

module.exports = {
  getAllCinemas,
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema,
  createSeats
};