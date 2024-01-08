import axios from "axios";

export async function fetchPlayers(setPlayers) {
    try {
        const response = await axios.get('http://localhost:4321/players');
        setPlayers(response.data);
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

export function savePlayer(student, setStudents) {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    };
    fetch("http://localhost:4321/players/", fetchOptions)
        .then(response => {
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Student added successfully');
            return response.json();
        })
        .then(json => {
            setStudents(json.data)
        })
        .catch(error => {
            console.error('Error adding student:', error.message);
        });
}