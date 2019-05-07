const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { handleError } = require('./middlewares/hangleErrorMiddleware');

const PORT = 8080;
require("./config/passport");

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(router);
app.use(handleError);


mongoose
  .connect(`mongodb+srv://nastya:6852922@ticket-reservation-bgnik.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser: true,
    reconnectTries: 10
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
