import React from 'react';
import {GameContextProvider} from "../../../contexts/GameContext";
import Game from "../../gamespace/Game";
import Navbar from "../../common/navbar/Navbar";
import Chat from "../../chat/Chat";
import Dice from "../../gamespace/Dice";


const GamePage = () => {
    return (
        <>
            <Navbar/>
            <GameContextProvider>
                <Game/>
                <div className='game-field__side-panel' onClick={e => e.stopPropagation()}>
                    <Chat/>
                    <Dice/>
                </div>
            </GameContextProvider>
        </>
    );
};

export default GamePage;