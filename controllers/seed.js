const Team = require('../models/teams');
const teams = require('../data/teams');

async function seedData(req, res) {
    try {
        await Team.insertMany(teams);
        res.status(201).send('Books seedes successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error seeding books');
    }
}

module.exports = { seedData };
