import React, {useEffect, useState} from "react";
import teamlistJSON from "../json/teamlist.json"

const PlayerList = ({players, handleDelete, handlePatch}) => {
    const teamList = teamlistJSON.team
    const [editable, setEditable] = useState(null)
    const [editPlayer, setEditPlayer] = useState(null)
    useEffect(() => {
        setEditPlayer(players[editable])
    }, [editable])
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setEditPlayer((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }))
    }
    console.log(editPlayer)
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
                                    editable === key && editPlayer ?
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="Enter new first name"
                                                    value={editPlayer.firstName}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Enter new last name"
                                                    value={editPlayer.lastName}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <select name="position" value={editPlayer.position} onChange={handleInputChange} required>
                                                    <option value="goalkeeper">Goalkeeper</option>
                                                    <option value="defense">Defense</option>
                                                    <option value="midfield">Midfield</option>
                                                    <option value="attack">Attack</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Enter new marketvalue"
                                                    value={editPlayer.marketvalue}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <select name="team" value={editPlayer.team} onChange={handleInputChange} >
                                                    <option value="" >Wähle ein Team</option>
                                                    {
                                                        teamList.map((name) => {
                                                            return <option value={name}>{name}</option>
                                                        })
                                                    }
                                                </select>
                                            </td>
                                            <input
                                                type="text"
                                                placeholder="Enter new first league team"
                                                value={editPlayer.leagueTeam}
                                                onChange={handleInputChange}
                                            />
                                            <td><button onClick={() => {
                                                setEditable(null)
                                                handlePatch(editPlayer)
                                            }}>Sichern</button></td>
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