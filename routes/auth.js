const express = require('express');
const userControllers = require('../controllers/userControllers');
//const auth = require('../middlewares/passportMiddleware');

const router = express.Router();
router.post('/signup', userControllers.register);
router.post('/login', userControllers.login);
//router.get('/private', /* auth.required, */ userControllers.getPrivateInfo);
router.get('/logout', userControllers.logout);

module.exports = router;