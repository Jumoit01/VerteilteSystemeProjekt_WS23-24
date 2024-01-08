import React, { useState } from 'react';
import axios from 'axios';

function PlayerForm({ show, handleClose, onSave }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        marketvalue: '',
        team: '',
        leagueTeam: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Add Player</h2>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </label>
                    <label>
                        Position:
                        <select name="position" value={formData.position} onChange={handleChange} required>
                            <option value="goalkeeper">Goalkeeper</option>
                            <option value="defense">Defense</option>
                            <option value="midfield">Midfield</option>
                            <option value="attack">Attack</option>
                        </select>
                    </label>
                    <label>
                        Market Value:
                        <input type="number" name="marketvalue" value={formData.marketvalue} onChange={handleChange} required />
                    </label>


                <button onClick={() => {
                    onSave(formData)
                    handleClose()
                }}>Add Player</button>
            </div>
        </div>
    );
}

export default PlayerForm;
