const express = require('express');
const sessionControllers = require('../controllers/sessionControllers');
//const auth = require('../middlewares/passportMiddleware');

const router = express.Router();
router.get('/sessions', sessionControllers.getAllSessions);
router.get('/sessions/:id', sessionControllers.getSessionById);
/* router.get('/films/:id', filmControllers.getFilm);
router.post('films', filmControllers.createFilm);
router.put('films/:id', filmControllers.updateFilm);
router.delete('films/:id', filmControllers.deleteFilm); */

module.exports = router;