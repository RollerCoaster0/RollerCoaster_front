import {createContext, useState} from "react";
import {useInitGame} from "../hooks/useInitGame";

export const GameContext = createContext(undefined);


export const eventUpdateType = {
    MADE_MOVE: 0,
    DICE_THROWN: 1,
    SKILL_USED: 2,
    QUEST_STATUS_UPDATED: 3,
    CHARACTER_STATUS_UPDATED: 4,
    SESSION_STATUS_CHANGED: 5
}

export const GameContextProvider = ({children, session, players}) => {
    console.log('GMCOTPR', players)
    const gameData = useInitGame(session, players)
    return <GameContext.Provider value={gameData}>
        {children}
    </GameContext.Provider>
}
