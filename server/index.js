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

app.get('/loaderio-ef93a9ed5f0210211846370e21d3bf3a',(req, res) => {
  res.send('loaderio-ef93a9ed5f0210211846370e21d3bf3a');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/stocks/:stockId', express.static(join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})