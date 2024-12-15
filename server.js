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
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
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

app.post('/teams', async (req, res) => {
    const {
        name = 'new team',
        division = 'division',
        founded = 'founded',
    } = req.body;

    const newTeam = new Team({
        name: name,
        division: division,
        founded: founded,
    });
    await newTeam.save();
    teams.push(newTeam);
    res.status(201).redirect('/teams');
});

app.get('/teams/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (team) {
            res.render('teams/show', { title: 'team details', team });
        } else {
            console.error(error.message);
            res.status(404).render('404/notFound', {
                title: 'Team not found',
            });
        }
    } catch (error) {
        res.status(500).send('internal server error');
    }
});

app.get('/teams/:id/edit', async (req, res) => {
    const team = await Team.findById(req.params.id);
    if (team) {
        res.render('teams/edit', { title: 'edit Team', team });
    } else {
        res.status(404).render('404/notFound', {
            title: 'Team not found',
        });
    }
});

app.put('/teams/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body);
    if (updatedTeam) {
        res.status(200).redirect('/teams');
    } else {
        res.status(404).send('team not found');
    }
});

app.delete('/teams/:id', async (req, res) => {
    const { id } = req.params;
    const deleteTeam = await Team.findByIdAndDelete(id);
    if (deleteTeam) {
        res.status(200).redirect('/teams');
    } else {
        res.status(404).render('404/notFound', { title: 'team not found' });
    }
});

app.post('/seed', async (req, res) => {
    try {
        await Team.insertMany(teams);
        res.status(201).send('Teams seeded successfully');
    } catch (error) {
        console.error(error.message);
        res.status(404).send('Error seeding teams');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
