import {createContext, useState} from "react";
import {devConsts, getStaticPlayers, getStaticLocations} from "../util/util";
import {useLongPolling} from "../hooks/useLongPolling";

export const GameContext = createContext(undefined);


export const gamePhaseType = {
    WAITING_FOR_MOVE: 0,
    MAKING_MOVE: 1
}

export const eventUpdateType = {
    MADE_MOVE: 0,
    DICE_THROWN: 1,
    SKILL_USED: 2,
    QUEST_STATUS_UPDATED: 3,
    CHARACTER_STATUS_UPDATED: 4,
    SESSION_STATUS_CHANGED: 5
}

export const GameContextProvider = ({children}) => {
    const [players, setPlayers] = useState(getStaticPlayers())
    const [locations, setLocations] = useState(getStaticLocations)
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState(locations[0])
    const [pickedPlayer, setPickedPlayer] = useState(players[0])
    const [gamePhase, setGamePhase] = useState(gamePhaseType.MAKING_MOVE)
    const eventUpdate = useLongPolling(devConsts.api +  '/longpoll')

    switch (eventUpdate) {
        // case eventUpdateType.MADE_MOVE:
        //     const targetPos = eventUpdate.targetPosition.split().map(s => Number(s))
        //     setPlayers(players.map(p => p.id === eventUpdate.fromPlayerId ? {
        //         ...p,
        //         pos: {x: targetPos[0], y: targetPos[1]}
        //     } : p))
        //     break
        default:
            console.log(eventUpdate)
    }

    const updatePickedCharacter = (id) => {
        setPickedPlayer(players.find(c => c.id === id))
    }

    const updateCharacter = (id, newCharacter) => {
        setPlayers(players.map(c => c.id === id ? newCharacter : c))
    }

    const updateCurrentLocation = (id) => {
        setCurrentLocation(locations.find(l => l.id === id))
    }

    return <GameContext.Provider value={{
        cellSize,
        locations,
        currentLocation,
        setCurrentLocation,
        pickedPlayer,
        setPickedPlayer,
        gamePhase,
        setGamePhase,
        players,
        setPlayers
    }}>
        {children}
    </GameContext.Provider>
}
