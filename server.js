const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const app = express();
const cors = require('cors');
const PORT = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});