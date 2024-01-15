import React, {useState} from "react";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

const PlayerList = ({players, handleDelete, setPlayers}) => {
    const [editable, setEditable] = useState(null)
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setPlayers((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }))
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Marktwert</th>
                        <th>Team</th>
                        <th>Liga Team</th>
                    </tr>
                </thead>
                <tbody>
                    {players !== [] && players.map((player, key) => {
                        return (
                            <tr>
                                {
                                    editable === key ?
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Enter new first name"
                                                    value={player.firstName}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Enter new last name"
                                                    value={player.lastName}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Enter new position"
                                                    value={player.position}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Enter new marketvalue"
                                                    value={player.marketvalue}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Enter new team"
                                                    value={player.team}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <input
                                                type="text"
                                                placeholder="Enter new first league team"
                                                value={player.leagueTeam}
                                                onChange={handleInputChange}
                                            />
                                            <td><button onClick={() => setEditable(null)}>Sichern</button></td>
                                        </>
                                        :
                                        <>
                                            <td>{player.firstName} {player.lastName}</td>
                                            <td>{player.position}</td>
                                            <td>{player.marketvalue}</td>
                                            <td>{player.team}</td>
                                            <td>{player.leagueTeam}</td>
                                            <td><button onClick={() => setEditable(key)}>Bearbeiten</button></td>
                                        </>
                                }
                                <td><button onClick={() => handleDelete(player._id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default PlayerList;