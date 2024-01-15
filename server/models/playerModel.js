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
        required: false,
        enum: [
            'Bayer 04 Leverkusen',
            'FC Bayern München',
            'RB Leipzig',
            'Borussia Dortmund',
            'VfL Wolfsburg',
            'Eintracht Frankfurt',
            'VfB Stuttgart',
            'Borussia Mönchengladbach',
            'SC Freiburg',
            '1.FC Union Berlin',
            'TSG 1899 Hoffenheim',
            'FC Augsburg',
            '1.FSV Mainz 05',
            '1.FC Köln',
            'SV Werder Bremen',
            'VfL Bochum',
            '1.FC Heidenheim 1846',
            'SV Darmstadt 98'
        ]
    },
    leagueTeam: {
        type: String,
        
    }

});

module.exports = mongoose.model('players', playerSchema)