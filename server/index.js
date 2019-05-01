/* eslint-disable no-console */
require('newrelic');
require('dotenv').config();
const express = require('express');
const { join } = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mountRoutes = require('./routes');


const { PORT } = process.env

const app = express();
const port = PORT || 8080;
app.use(cors());
mountRoutes(app);

app.get('/loaderio-4b30aa4e4ad8fb836f7a36b6947eec42', (req, res) => {
  res.send('loaderio-4b30aa4e4ad8fb836f7a36b6947eec42');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/stocks/:stockId', express.static(join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})