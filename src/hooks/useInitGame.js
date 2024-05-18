import {useState} from "react";
import {devConsts, getStaticLocations, getStaticPlayers} from "../util/util";
import {gamePhaseType} from "../contexts/GameContext";

export function useInitGame() {
    const [players, setPlayers] = useState(getStaticPlayers())
    const [locations, setLocations] = useState(getStaticLocations)
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState(locations[0])
    const [pickedPlayer, setPickedPlayer] = useState(players[0])
    const [gamePhase, setGamePhase] = useState(gamePhaseType.MAKING_MOVE)

    // const eventUpdate = useLongPolling()
    //
    // switch (eventUpdate) {
    //     case eventUpdateType.MADE_MOVE:
    //         const targetPos = eventUpdate.targetPosition.split().map(s => Number(s))
    //         setPlayers(players.map(p => p.id === eventUpdate.fromPlayerId ? {
    //             ...p,
    //             pos: {x: targetPos[0], y: targetPos[1]}
    //         } : p))
    //         break
    //     default:
    //         console.log(eventUpdate)
    // }

    return {
        players,
        setPlayers,
        locations,
        setLocations,
        cellSize,
        setCellSize,
        currentLocation,
        setCurrentLocation,
        pickedPlayer,
        setPickedPlayer,
        gamePhase,
        setGamePhase
    }
}