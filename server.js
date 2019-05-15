const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { handleError } = require('./middlewares/hangleErrorMiddleware');
/* const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);  */

const {io, app, server} = require("./config/socket");
// < Interesting!
/* var server = require('http').Server(app);
var io = require('socket.io')(server); */

const socketRouter = require('./routes/socket');

const PORT = 8080;
require("./config/passport");

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
//app.use(router);


io.on('connection', function(socket){
  console.log('a user connected');
  app.use(router);
  //app.use('/api', socketRouter(io))
});

app.use(handleError);


mongoose
  .connect(`mongodb+srv://nastya:6852922@ticket-reservation-bgnik.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser: true,
    reconnectTries: 10
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
