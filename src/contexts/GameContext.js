import {createContext, useState} from "react";
import {devConsts, getStaticCharacters,  getStaticLocations} from "../util/util";
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
    const [characters, setCharacters] = useState(getStaticCharacters())
    const [locations, setLocations] = useState(getStaticLocations)
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState(locations[0])
    const [pickedCharacter, setPickedCharacter] = useState(characters[0])
    const [gamePhase, setGamePhase] = useState(gamePhaseType.MAKING_MOVE)
    const eventUpdate = useLongPolling('/longpoll')


    const updatePickedCharacter = (id) => {
        setPickedCharacter(characters.find(c => c.id === id))
    }

    const updateCharacter = (id, newCharacter) => {
        setCharacters(characters.map(c => c.id === id ? newCharacter : c))
    }

    const updateCurrentLocation = (id) => {
       setCurrentLocation(locations.find(l => l.id === id))
    }

    return <GameContext.Provider value={{cellSize, locations, currentLocation, setCurrentLocation, pickedCharacter, setPickedCharacter, gamePhase, setGamePhase, characters, setCharacters}}>
        {children}
    </GameContext.Provider>
}
