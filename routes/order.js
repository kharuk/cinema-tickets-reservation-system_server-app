const express = require('express');
const orderControllers = require('../controllers/orderControllers');
const passport =  require('passport');

const router = express.Router();
router.get('/orders', passport.authenticate('jwt', { session: false }), orderControllers.getOrders);
router.post('/orders', passport.authenticate('jwt', { session: false }), orderControllers.createOrder);

module.exports = router;