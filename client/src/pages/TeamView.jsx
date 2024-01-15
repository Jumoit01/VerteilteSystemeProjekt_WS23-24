import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {fetchPlayers, savePlayer} from "../services/fetchAPI";
import AddPlayer from "../components/buttons/AddPlayer";
import PlayerList from "../components/player_list/PlayerList";


const TeamView = () => {
    const [players, setPlayers] = useState([]);

    // Fetch all players when the component mounts
    useEffect(() => {
        fetchPlayers(setPlayers);
    }, []);


    const handleSavePlayer = (newStudent) => {
        savePlayer(newStudent, setPlayers)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Willst du den Spieler wirklich löschen?")) {
            return
        }
        try {
            let playerData = await axios.delete(`http://localhost:4321/players/id/${id}`);
            console.log(playerData.data.data)
            let players = playerData.data.data

            setPlayers(players);
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };


    return (
        <div>
            <h3>Spielerliste</h3>

            <AddPlayer onSave={handleSavePlayer}/>
            <PlayerList players={players} handleDelete={handleDelete} setPlayers={setPlayers}/>
        </div>
    );
}

export default TeamView;