import React, {useContext, useState} from 'react';
import {Alert, Button, Modal, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './style_postpage.css'
import {fetchSessionInfo} from "../../../api/game";
import {AlertContext} from "../../../contexts/AlertContext";

const Postpage = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [IDgame, setIDgame] = useState("");
    const {showAlert} = useContext(AlertContext)
    const [errorShown, setErrorShown] = useState(false)
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleGameId = async (id) => {
        navigate(`/lobby/${id}`)
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
                        width: "60%",
                        height: "10%",
                        fontSize: "20px",
                        margin: "auto",
                        display: "block",
                        borderRadius:"20px"
                    }}> Создать игру </Button>
            <Button variant="contained" color="success"
                    onClick={handleOpenModal}
                    sx={{
                        backgroundColor: "darkolivegreen",
                        width: "60%",
                        height: "10%",
                        fontSize: "20px",
                        margin: "auto",
                        display: "block",
                        borderRadius:"20px"

                    }}>Войти в игру</Button>

            <div className="list_postpage">
                <Modal
                    style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        height: "15%",
                        width: "20%",
                        margin: "auto",
                        backgroundColor: "#209B41",
                        borderRadius:"15px",
                        color:"white",


                    }}
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >

                    <div className="modal">
                        <h2 id="modal-title">Введите ваше ID</h2>
                        <TextField
                            sx={{
                                backgroundColor:"#717771CC",
                                borderRadius:"5px"
                            }}
                            variant="outlined"
                            value={IDgame}
                            onChange={e => setIDgame(e.target.value)}
                        />
                        <Button onClick={() => handleGameId(IDgame)} variant="contained" color="success">
                            Присоединиться к игре
                        </Button>
                    </div>
               </Modal>
                {errorShown ?
                    <Alert severity={'error'}>Invalid Id</Alert> : null }

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