import React from 'react';
import GameField from "../../gamespace/gamefield/GameField";
import {GameContextProvider} from "../../../contexts/GameContext";
import Chat from "../../chat/Chat";
import Game from "../../gamespace/Game";

const GamePage = () => {
    return (
            <GameContextProvider>
                {/*<GameField/>*/}
                <Game/>
                <Chat/>
            </GameContextProvider>
    );
};

export default GamePage;