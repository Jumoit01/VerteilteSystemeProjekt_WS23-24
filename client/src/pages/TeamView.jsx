import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {fetchPlayers, savePlayer} from "../services/fetchAPI";
import AddPlayer from "../components/buttons/AddPlayer";
import PlayerList from "../components/player_list/PlayerList";


const TeamView = () => {
    const [players, setPlayers] = useState([]);
    const [uniqueLeagueTeams, setUniqueLeagueTeams] = useState(null);
    const [shownTeam, setShownTeam] = useState("default");

    // Fetch all players when the component mounts
    useEffect(() => {
        fetchPlayers(setPlayers);
    }, []);
    useEffect(() => {
        setUniqueLeagueTeams([...new Set(players.map(player => player.leagueTeam))])
    }, [players]);
    useEffect(() => {
        console.log("test")
        setPlayers(players.filter(player => player.leagueTeam === shownTeam ))
    }, [shownTeam!=="default"]);

    console.log(uniqueLeagueTeams)
    const handleChange = (e) => {
        const { value } = e.target;

        setShownTeam(value);
    };
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
            <h3>Teamsicht</h3>

            <select value={shownTeam} onChange={handleChange} required>
                <option value="default" disabled>Wähle ein Team</option>
                {
                    uniqueLeagueTeams && uniqueLeagueTeams.map((team) => {
                        return(
                            <option value={team}>{team}</option>
                        )
                    })
                }
            </select>
            <PlayerList players={players} handleDelete={handleDelete} setPlayers={setPlayers}/>
        </div>
    );
}

export default TeamView;