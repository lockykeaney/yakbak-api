const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser  = require('body-parser');

// application configuration ===============================================================
const port  = process.env.PORT || 2000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database configuration ===============================================================
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yak');
mongoose.Promise = require('bluebird');

app.use(require('./routes'));

app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;
