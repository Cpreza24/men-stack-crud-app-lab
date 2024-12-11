const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    name: String,
    division: String,
    founded: number,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
