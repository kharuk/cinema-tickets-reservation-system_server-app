const express = require('express');
const authRouter = require('./auth');
const filmRouter = require('./film');
const sessionRouter = require('./session');
const cinemaRouter = require('./cinema');
const orderRouter = require('./order');


const router = express.Router();
router.use('/api', authRouter);
router.use('/api', filmRouter);
router.use('/api', sessionRouter);
router.use('/api', orderRouter);
router.use('/api', cinemaRouter);

module.exports = router;