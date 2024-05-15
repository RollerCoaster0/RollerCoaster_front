import React from 'react';
import GameField from "../../gamespace/gamefield/GameField";
import {GameContextProvider} from "../../../contexts/GameContext";
import Chat from "../../chat/Chat";

const GamePage = () => {
    return (
            <GameContextProvider>
                <GameField/>
                <Chat/>
            </GameContextProvider>
    );
};

export default GamePage;