import React, {useState} from "react";
import PlayerForm from "../player_form/PlayerForm";

const emptyPlayer = {
    "firstName": "",
    "lastName": "",
    "position": "",
    "marketvalue": null,
}


const AddPlayer = ({onSave}) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={openModal}>Add Player</button>
            <PlayerForm show={showModal} handleClose={closeModal} onSave={onSave} />
        </div>
    );
}

export default AddPlayer