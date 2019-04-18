const express = require('express');
const sessionControllers = require('../controllers/sessionControllers');
const passport =  require('passport');

const router = express.Router();
router.get('/sessions', passport.authenticate('jwt', { session: false }), sessionControllers.getAllSessions);
router.get('/sessions/:id', passport.authenticate('jwt', { session: false }), sessionControllers.getSessionById);
router.post('/sessions', passport.authenticate('jwt', { session: false }), sessionControllers.createSession);
router.put('/sessions/:id/seats/removeBooking', passport.authenticate('jwt', { session: false }), sessionControllers.removeBooking);
router.put('/sessions/:session_id/seats/:id', passport.authenticate('jwt', { session: false }), sessionControllers.updateSeatInfo);
router.put('/sessions/:id/seats/', passport.authenticate('jwt', { session: false }), sessionControllers.bookSelectedSeats);
router.delete('/films/:id/sessions/', passport.authenticate('jwt', { session: false }), sessionControllers.deleteAllSessions);


module.exports = router;