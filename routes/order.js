const express = require('express');
const orderControllers = require('../controllers/orderControllers');
//const auth = require('../middlewares/passportMiddleware');

const router = express.Router();
router.get('/orders', orderControllers.getAllOrders);
router.post('/orders', orderControllers.createOrder);

module.exports = router;