import React from 'react';
import Navbar from "../../common/navbar/Navbar";
import GameField from "../../gamespace/gamefield/GameField";
import {GameContextProvider} from "../../GameContext";

const GamePage = () => {
    return (
        <>
            <Navbar/>
            <GameContextProvider>
                <GameField/>
            </GameContextProvider>
        </>
    );
};

export default GamePage;