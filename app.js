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
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/yak');


const env = process.env.NODE_ENV;

// if(env === 'development') {
//   console.log(env);
//   mongoose.connect('mongodb://localhost/yak');
// } else if(env === 'production') {
//   mongoose.connect('mongodb://lockykeaney:17Gardiner@ds013848.mlab.com:13848/mysterious-citadel');
//   console.log(env);
// }

mongoose.Promise = require('bluebird');

app.use(require('./routes'));

app.listen(port);
console.log('The magic happens on port ' + port + env);

module.exports = app;
