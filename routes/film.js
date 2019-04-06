const express = require('express');
const filmControllers = require('../controllers/filmControllers');
//const auth = require('../middlewares/passportMiddleware');

const router = express.Router();
router.get('/films', filmControllers.getAllFilms);
router.get('/films/:id', filmControllers.getFilm);
router.post('films', filmControllers.createFilm);
router.put('films/:id', filmControllers.updateFilm);
router.delete('films/:id', filmControllers.deleteFilm);

module.exports = router;