import React, {useState} from 'react';
import {Button, Modal, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './style_postpage.css'

const Postpage = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [IDgame, setIDgame] = useState("");

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleJoinGame = () => {
        console.log("ID game:", IDgame);
        // Добавить логику для присоединения игрока к игре с использованием IDgame
    };
    return (
        <div className="post-page">

            <Button variant="contained" color="success"
                    onClick={() => navigate("/creategame")}
                    sx={{
                        backgroundColor: "darkolivegreen",
                        width: "300px",
                        height: "50px",
                        fontSize: "20px",
                        margin: "auto",
                        display: "block",

                    }}> Создать игру </Button>
            <Button variant="contained" color="success"
                    sx={{
                        backgroundColor: "darkolivegreen",
                        width: "300px",
                        height: "50px",
                        fontSize: "20px",
                        margin: "auto",
                        display: "block",

                    }}>Войти в игру</Button>

            <div className="list_postpage">
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <div className="modal">
                        <h2 id="modal-title">Введите ваше имя</h2>
                        <TextField
                            label="IDgame"
                            variant="outlined"
                            value={IDgame}

                        />
                        <Button variant="contained" color="primary" onClick={handleJoinGame}>
                            Присоединиться к игре
                        </Button>
                    </div>
                </Modal>
                <div className="list_postpage__list-item">
                    <img src="./" alt="placeholder"/>
                    <p>Игра 1</p>
                </div>
                <div className="list_postpage__list-item">
                    <img src="https://via.placeholder.com/150" alt="placeholder"/>
                    <p>Игра 2</p>
                </div>
            </div>
        </div>

    );
};

export default Postpage;