const express = require('express');
const authRouter = require('./auth');
const filmRouter = require('./film');
const sessionRouter = require('./session');


const router = express.Router();
router.use('/api', authRouter);
router.use('/api', filmRouter);
router.use('/api', sessionRouter);

module.exports = router;