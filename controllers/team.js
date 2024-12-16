const Team = require('../models/teams');
const team = require('../data/teams');

async function index(req, res) {
    try {
        const teamsDb = await Team.find({});
        res.render('./teams/index', { teams: teamsDb });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

function newTeam(req, res) {
    res.render('teams/new', { title: 'New Team' });
}

// app.post('/teams', async (req, res) => {
//     const {
//         name = 'new team',
//         division = 'division',
//         founded = 'founded',
//     } = req.body;

//     const newTeam = new Team({
//         name: name,
//         division: division,
//         founded: founded,
//     });
//     await newTeam.save();
//     teams.push(newTeam);
//     res.status(201).redirect('/teams');
// });

async function postTeam(req, res) {
    try {
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
        res.status(201).redirect('/teams');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

async function showTeam(req, res) {
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
}

async function editTeam(req, res) {
    try {
        const team = await Team.findById(req.params.id);
        if (team) {
            res.render('teams/edit', { title: 'edit Team', team });
        } else {
            res.status(404).render('404/notFound', {
                title: 'Team not found',
            });
        }
    } catch (error) {
        res.status(500).send('internal server error');
    }
}

async function updateTeam(req, res) {
    try {
        const { id } = req.params;
        const updatedTeam = await Team.findByIdAndUpdate(id, req.body);
        if (updatedTeam) {
            res.status(200).redirect('/teams');
        } else {
            res.status(404).send('team not found');
        }
    } catch (error) {
        res.status(500).send('internal server error');
    }
}

async function deleteTeam(req, res) {
    try {
        const { id } = req.params;
        const deleteTeam = await Team.findByIdAndDelete(id);
        if (deleteTeam) {
            res.status(200).redirect('/teams');
        } else {
            res.status(404).render('404/notFound', { title: 'team not found' });
        }
    } catch (error) {
        res.status(500).send('internal server error');
    }
}

module.exports = {
    index,
    newTeam,
    postTeam,
    editTeam,
    updateTeam,
    showTeam,
    deleteTeam,
};
