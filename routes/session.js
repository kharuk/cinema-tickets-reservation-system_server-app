const express = require('express');
const sessionControllers = require('../controllers/sessionControllers');
const passport =  require('passport');

const router = express.Router();
router.get('/sessions', sessionControllers.getAllSessions);
router.get('/sessions/:id', sessionControllers.getSessionById);
router.post('/sessions', sessionControllers.createSession);
router.put('/sessions/:id/seats/removeBooking', passport.authenticate('jwt', { session: false }), sessionControllers.removeBooking);
router.put('/sessions/:session_id/seats/:id', passport.authenticate('jwt', { session: false }), sessionControllers.updateSeatInfo);
router.put('/sessions/:id/seats/', passport.authenticate('jwt', { session: false }), sessionControllers.bookSelectedSeats);


module.exports = router;