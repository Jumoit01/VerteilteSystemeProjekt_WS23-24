const express = require('express');
const cors = require('cors');
const app = express();
const playerRoutes = require('./routes/playerRoutes')
const teamRoutes = require('./routes/teamRoutes')

// CORS setup so that localhost:8080 can be accessed by browser
app.use(cors());
app.use(express.json())
app.use('/players', playerRoutes);
app.use('/teams', teamRoutes);


// default page
app.get('/', (req, res) => {
    res.send('Home Page');
})

module.exports = app;