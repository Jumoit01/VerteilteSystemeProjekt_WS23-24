const express = require('express')
const router = express.Router();
const playerModel = require('../models/playerModel.js');

// route for GET request: get all players
router.get('/', async (req, res) => {
    try {
        const allPlayers = await playerModel.find();
        // Code 200: get successful
        res.status(200).json(allPlayers);
    } catch (err) {
        // Code 500: server error
        res.status(500).json({message: err.message});
    }
});

// route for GET request: get player by id
router.get('/id/:id', getPlayer, (req, res) => {
    // Code 200: get successful
    res.status(200).json(res.players);
});

// GET Request: Find player with last name
router.get('/lastName/:name', async(req, res) => {
    let player
    try {
        player = await playerModel.findOne({ lastName: req.params.name });
        if (player == null) {
            // Code 404: not found
            return res.status(404).json({message: 'Cannot find player'})
        }
    } catch (err) {
        // Code 500: server error
        return res.status(500).json({message: err.message})
    }
    res.status(200).json(player);
});

//Create new player
router.post('/', async (req, res) => {
    console.log(req.body)

    try {
        await playerModel.create(req.body)
        // Code 201: successfully created object
        res.status(201).json({
            message: 'Added player',
            data: await playerModel.find()
        })
    } catch (err) {
        // Code 400: user error
        res.status(400).json({message: err.message})
    }
});
// route for PATCH request: update players by id
router.patch('/id/:id', getPlayer, async (req, res) => {
    try {
        if (req.body.length === 0) {
            // Code 404: not found
            return res.status(404).json({message: 'Nothing to update'})
        }
        Object.assign(res.players, req.body)
        await res.players.save()
        // Code 200: successfully updated
        res.status(200).json({
            message: 'Updated player',
            data: await playerModel.find()
        })
    } catch (err) {
        // Code 400: user error
        res.status(400).json({message: err.message})
    }
});

// route for DELETE request: delete player by id
router.delete('/id/:id', getPlayer, async (req, res) => {
    try {
        await res.players.deleteOne();
        res.status(200).json({
            message: 'Deleted player',
            data: await playerModel.find()
        })
    } catch (err) {
        // Code 500: server error
        res.status(500).json({message: err.message})
    }
});



// middleware function: get player by id
async function getPlayer(req, res, next) {
    let players
    try {
        players = await playerModel.findById(req.params.id)
        if (players == null) {
            // Code 404: not found
            return res.status(404).json({message: 'Cannot find players'})
        }
    } catch (err) {
        // Code 500: server error
        return res.status(500).json({message: err.message})
    }
    res.players = players;
    next();
}

module.exports = router;