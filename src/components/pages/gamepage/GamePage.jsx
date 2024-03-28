import React from 'react';
import GameField from "../../gamespace/gamefield/GameField";
import {GameContextProvider} from "../../gamespace/GameContext";

const GamePage = () => {
    return (
        <>
            <GameContextProvider>
                <GameField/>
            </GameContextProvider>
        </>
    );
};

export default GamePage;