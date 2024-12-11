//Require dotenv to allow access to the port number
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();
const Team = require('./models/teams');
const teams = require('./data/teams');

require('./configs/database');

// ********************
//    MIDDLEWARE
// ********************
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', (req, res) => {
    res.render('./home/index');
});

app.get('/teams', (req, res) => {
    //res.json(teams);
    res.render('./teams/index', { teams: teams });
});

app.get('/teams/new', (req, res) => {
    res.render('./teams/new');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
