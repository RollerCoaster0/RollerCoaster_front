import React from 'react';
import {GameContextProvider} from "../../../contexts/GameContext";
import Game from "../../gamespace/Game";
import Chat from "../../chat/Chat";
import Dice from "../../gamespace/Dice";
import {useLoaderData,} from "react-router-dom";
import Navbar from "../../common/navbar/Navbar";


const GamePage = () => {
    const session = useLoaderData()
    return (
        <>
            <Navbar/>
            <GameContextProvider session={session}>
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