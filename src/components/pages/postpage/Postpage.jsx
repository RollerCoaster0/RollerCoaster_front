import React, {useState} from 'react';
import {Button, Modal, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './style_postpage.css'
import {fetchSessionInfo} from "../../../api/game";

const Postpage = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [IDgame, setIDgame] = useState("");

    const handleOpenModal = () => {
        setOpenModal(true);
    };


    const handleGameId = async (id) => {
        const response = await fetchSessionInfo(id)
        

    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleJoinGame = () => {
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
                    onClick={handleOpenModal}
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
                    style={{
                        position: "absolute",
                        height: 150,
                        width: 240,
                        margin: "auto"

                    }}
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >

                    <div className="modal">
                        <h2 id="modal-title">Введите ваше ID</h2>
                        <TextField
                            variant="outlined"
                            value={IDgame}
                            onChange={e => setIDgame(e.target.value) }
                        />
                        <Button onClick={() => navigate(`/game/${IDgame}`)} variant="contained" color="primary" >
                            Присоединиться к игре
                        </Button>

                    </div>
                </Modal>
                {/*<div className="list_postpage__list-item">*/}
                {/*    <img src="./" alt="placeholder"/>*/}
                {/*    <p>Игра 1</p>*/}
                {/*</div>*/}
                {/*<div className="list_postpage__list-item">*/}
                {/*    <img src="https://via.placeholder.com/150" alt="placeholder"/>*/}
                {/*    <p>Игра 2</p>*/}
                {/*</div>*/}
            </div>
        </div>

    );
};

export default Postpage;