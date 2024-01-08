const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
        enum: ['goalkeeper', 'defense', 'midfield', 'attack']
    },
    marketvalue: {
        type: Number,
        required: true
    },
    team: {
        type: String,
        required: false
    },
    leagueTeam: {
        type: String,
        
    }

});

module.exports = mongoose.model('players', playerSchema)