import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {fetchPlayers, savePlayer} from "../services/fetchAPI";
import AddPlayer from "../components/buttons/AddPlayer";
import PlayerList from "../components/player_list/PlayerList";


const Home = () => {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        marketvalue: '',
        team: '',
        leagueTeam: ''
    });

    // Fetch all players when the component mounts
    useEffect(() => {
        fetchPlayers(setPlayers);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch('http://localhost:4321/', formData);
            setFormData({
                firstName: '',
                lastName: '',
                position: '',
                marketvalue: '',
                team: '',
                leagueTeam: ''
            });
        } catch (error) {
            console.error('Error creating player:', error);
        }
    };

    const handleSavePlayer = (newStudent) => {
        savePlayer(newStudent, setPlayers)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Willst du den Spieler wirklich löschen?")) {
            return
        }
        try {
            let players = await axios.delete(`http://localhost:4321/players/id/${id}`);
            console.log(players)

            const updatedPlayers = players.filter(player => player._id !== id);
            setPlayers(updatedPlayers);
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    console.log(players)

    return (
        <div>
            <h1>Football Base</h1>

            <AddPlayer onSave={handleSavePlayer}/>
            <PlayerList players={players} handleDelete={handleDelete} setPlayers={setPlayers}/>
        </div>
    );
}

export default Home;