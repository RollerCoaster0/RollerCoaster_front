import React from 'react';
import GameField from "../../gamespace/gamefield/GameField";
import {GameContextProvider} from "../../../contexts/GameContext";
import Chat from "../../chat/Chat";
import Game from "../../gamespace/Game";
import Chat2 from "../../chat/Chat2";

const GamePage = () => {
    return (
            <GameContextProvider>
                <Game/>
                <Chat/>
            </GameContextProvider>
    );
};

export default GamePage;