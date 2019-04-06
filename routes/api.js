const express = require('express');
const authRouter = require('./auth');
const filmRouter = require('./film');
const sessionRouter = require('./session');
const orderRouter = require('./order');


const router = express.Router();
router.use('/api', authRouter);
router.use('/api', filmRouter);
router.use('/api', sessionRouter);
router.use('/api', orderRouter);

module.exports = router;