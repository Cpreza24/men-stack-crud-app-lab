//Require dotenv to allow access to the port number
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const Team = require('./models/teams');
const teams = require('./data/teams');

// ********************
//    DATABASE
// ********************
require('./configs/database');

// ********************
//    MIDDLEWARE
// ********************
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(methodOverride('_method'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// ********************
//    ROUTES
// ********************
app.use('/', require('./routes/home'));

app.use('/', require('./routes/seed'));

app.use('/', require('./routes/team'));

// ********************
//    LISTENER
// ********************
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
