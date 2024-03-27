import React from 'react';
import Navbar from "../../common/navbar/Navbar";
import GameField from "../../gamespace/gamefield/GameField";
import {GameContextProvider} from "../../gamespace/GameContext";

const GamePage = () => {
    return (
        <>
            <div><Navbar/></div>
            <div>
            <GameContextProvider>
                <GameField/>
            </GameContextProvider>
            </div>
        </>
    );
};

export default GamePage;