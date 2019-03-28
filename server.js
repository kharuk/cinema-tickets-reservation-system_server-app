const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const app = express();
const cors = require('cors');
const PORT = 8080;
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require("./config/passport");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(session({secret: 'shhsecret', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


app.use(router);

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
