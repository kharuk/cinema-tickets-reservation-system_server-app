const express = require('express');
const sessionControllers = require('../controllers/sessionControllers');
//const auth = require('../middlewares/passportMiddleware');

const router = express.Router();
router.get('/sessions', sessionControllers.getAllSessions);
router.get('/sessions/:id', sessionControllers.getSessionById);
router.post('/sessions', sessionControllers.createSession)
router.put('/sessions/:session_id/seats/:id', sessionControllers.updateSeatInfo)

module.exports = router;