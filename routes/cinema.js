const express = require('express');
const cinemaControllers = require('../controllers/cinemaControllers');
//const auth = require('../middlewares/passportMiddleware');

const router = express.Router();
router.get('/cinemas', cinemaControllers.getAllCinemas);
router.get('/cinemas/:id', cinemaControllers.getCinema);
router.post('/cinemas', cinemaControllers.createCinema);
router.put('/cinemas/:id', cinemaControllers.updateCinema);
router.delete('/cinemas/:id', cinemaControllers.deleteCinema);

router.post('/seats', cinemaControllers.createSeats);

module.exports = router;