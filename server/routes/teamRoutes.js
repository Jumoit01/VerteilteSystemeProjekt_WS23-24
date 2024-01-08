const express = require('express')
const router = express.Router();
const teamModel = require('../models/teamModel.js');



// route for GET request: get all students
router.get('/', async (req, res) => {
    try {
        const allTeams = await teamModel.find();
        console.log(allTeams)
        // Code 200: get successful
        res.status(200).json(allTeams);
    } catch (err) {
        // Code 500: server error
        res.status(500).json({message: err.message});
    }
});

// route for GET request: get team by id
router.get('/id/:id', getTeams, (req, res) => {
    // Code 200: get successful
    res.status(200).json(res.teams);
});

// GET Request: Find team with last name
router.get('/teamName/:name', async(req, res) => {
    let teams
    try {
        teams = await teamModel.findOne({ lastName: req.params.name });
        if (teams == null) {
            // Code 404: not found
            return res.status(404).json({message: 'Cannot find teams'})
        }
    } catch (err) {
        // Code 500: server error
        return res.status(500).json({message: err.message})
    }
    res.status(200).json(teams);
});

//Create new team
router.post('/', async (req, res) => {
    console.log(req.body)

    try {
        await teamModel.create(req.body)
        // Code 201: successfully created object
        res.status(201).json({
            message: 'Added team',
            data: await teamModel.find()
        })
    } catch (err) {
        // Code 400: user error
        res.status(400).json({message: err.message})
    }
});
// route for PATCH request: update teams by id
router.patch('/id/:id', getTeams, async (req, res) => {
    try {
        if (req.body.length === 0) {
            // Code 404: not found
            return res.status(404).json({message: 'Nothing to update'})
        }
        Object.assign(res.teams, req.body)
        await res.teams.save()
        // Code 200: successfully updated
        res.status(200).json({
            message: 'Updated team',
            data: await teamModel.find()
        })
    } catch (err) {
        // Code 400: user error
        res.status(400).json({message: err.message})
    }
});

// route for DELETE request: delete team by id
router.delete('/id/:id', getTeams, async (req, res) => {
    try {
        await res.teams.deleteOne();
        res.status(200).json({
            message: 'Deleted team',
            data: await teamModel.find()
        })
    } catch (err) {
        // Code 500: server error
        res.status(500).json({message: err.message})
    }
});



// middleware function: get team by id
async function getTeams(req, res, next) {
    let teams
    try {
        teams = await teamModel.findById(req.params.id)
        if (teams == null) {
            // Code 404: not found
            return res.status(404).json({message: 'Cannot find teams'})
        }
    } catch (err) {
        // Code 500: server error
        return res.status(500).json({message: err.message})
    }
    res.teams = teams;
    next();
}

module.exports = router;