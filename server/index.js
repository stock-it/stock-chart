/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const { join } = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mountRoutes = require('./routes');




const app = express();
const port = 4005;
app.use(cors());
mountRoutes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/stocks/:stockId', express.static(join(__dirname, '/../public/dist')));

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`)
})