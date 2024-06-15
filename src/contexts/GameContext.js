import {createContext, useState} from "react";
import {devConsts, getStaticPlayers, getStaticLocations} from "../util/util";
import {useLongPolling} from "../hooks/useLongPolling";
import {useInitGame} from "../hooks/useInitGame";

export const GameContext = createContext(undefined);


export const gamePhaseType = {
    WAITING_FOR_MOVE: 0,
    MAKING_MOVE: 1,
    PREPARATION_PHASE: 2,
    PAUSED: 3
}

export const eventUpdateType = {
    MADE_MOVE: 0,
    DICE_THROWN: 1,
    SKILL_USED: 2,
    QUEST_STATUS_UPDATED: 3,
    CHARACTER_STATUS_UPDATED: 4,
    SESSION_STATUS_CHANGED: 5
}

export const GameContextProvider = ({children, session}) => {
    const gameData = useInitGame(session)

    return <GameContext.Provider value={gameData}>
        {children}
    </GameContext.Provider>
}
