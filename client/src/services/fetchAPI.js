import axios from "axios";

export async function fetchPlayers(setPlayers) {
    try {
        const response = await axios.get('http://localhost:4321/players');
        setPlayers(response.data);
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

export function savePlayer(player, setPlayers) {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
    };
    fetch("http://localhost:4321/players/", fetchOptions)
        .then(response => {
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Player added successfully');
            return response.json();
        })
        .then(json => {
            setPlayers(json.data)
        })
        .catch(error => {
            console.error('Error adding player:', error.message);
        });
}

export function patchPlayer(player, setPlayers) {
    console.log(player)
    const fetchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
    };
    fetch(`http://localhost:4321/players/id/${player._id}`, fetchOptions)
        .then(response => {
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Player updated successfully');
            return response.json();
        })
        .then(json => {
            setPlayers(json.data)
        })
        .catch(error => {
            console.error('Error adding player:', error.message);
        });
}