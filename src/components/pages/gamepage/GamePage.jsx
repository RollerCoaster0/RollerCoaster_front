import React from 'react';
import {GameContextProvider} from "../../../contexts/GameContext";
import Chat from "../../chat/Chat";
import Game from "../../gamespace/Game";
import UserContextProvider from "../../../contexts/UserContext";
import Navbar from "../../common/navbar/Navbar";


const GamePage = () => {
    return (
        <>
            <Navbar/>
            <GameContextProvider>
                <Game/>
                <Chat/>
            </GameContextProvider>
        </>
    );
};

export default GamePage;