import {useContext, useEffect, useRef, useState} from "react";
import {devConsts,} from "../util/util";
import {gamePhaseType} from "../contexts/GameContext";
import red_player from '../devassets/red_player.png'
import {useLongPoll,} from "./useLongPolling";
import {fetchClasses, fetchGame, fetchLocationsBackground, fetchPlayers, fetchSessionInfo} from "../api/game";
import {UserContext} from "../contexts/UserContext";

export function useInitGame(session) { //session prop
    const [players, setPlayers] = useState([])
    const currentPlayerId = useRef()
    const [locations, setLocations] = useState([])
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState()
    const [pickedPlayer, setPickedPlayer] = useState(players[0])
    const [gamePhase, setGamePhase] = useState(gamePhaseType.MAKING_MOVE)
    const [lastReceivedMessage, setLastReceivedMessage] = useState()
    const {user} = useContext(UserContext)
    const zoomFlag = useRef(false)

    const [game, setGame] = useState({id: 4})
    const pollingFlag = useRef(true)

    const event = useLongPoll(pollingFlag)

    useEffect(() => {
        if (event) {
            console.log('LP EVENT: ', event)
            for (const eventKey in event) {
                //гарантируется, что за раз придет только один ивент
                if (event[eventKey]) {
                    switch (eventKey) {
                        case 'questStatusUpdate':
                            handleSessionStatusUpdated(event.questStatus)
                            break
                        case 'move':
                            handleMoveEvent(event.move)
                            break
                        case 'newMessage':
                            setLastReceivedMessage(event.newMessage)
                            break
                        case 'sessionStarted':
                            handleSessionStatusUpdated(event.sessionStarted)
                            break
                    }
                    break
                }
            }
        }
    }, [event])

    const handleMoveEvent = (event) => {
        const movedPlayer = event.player
        setPlayers(players => players.map(p => {
            if (p.id === movedPlayer.id) {
                return {...p, pos: {x: event.x, y: event.y}}
            }
            return p
        }))
    }
    const handleSessionStatusUpdated = (event) => {

    }

    const handleQuestStatusEvent = (event) => {

    }
    useEffect(() => {
            const setGameData = async () => {
                let data = session
               let response = await fetchGame(data.gameId)
                if (!response.ok) {
                    //TODO: handle
                    console.log('FAILED TO FETCH GAME', response)
                    return
                }
                data = await response.json()
                let fetchedPlayers = await fetchPlayers(session.id)
                let classes = await fetchClasses(fetchedPlayers.map(p => p.characterClassId))
                let backgrounds = await fetchLocationsBackground(data.locations.map(l => l.mapFilePath))
                setPlayers(fetchedPlayers.map(((p, i) => {
                    return {
                        id: p.id,
                        userId: p.userId,
                        name: p.name,
                        pos: {x: p.currentXPosition, y: p.currentYPosition},
                        characterClass: classes[i],
                        avatar:red_player
                    }
                })))
                let locs = data.locations.map((loc, i) => {
                    return {
                        id: loc.id,
                        name: loc.name,
                        description: loc.description,
                        background: backgrounds[i],
                        size: [loc.width, loc.height],
                    }
                })
                setLocations(locs)

                currentPlayerId.current = fetchedPlayers.find(p => { console.log(user, p); return  p.userId === user?.id})?.id
                // if (!currentPlayerId.current) {
                //     throw new Error('не найден текущий игрок')
                // }
                setCurrentLocation(locs[0])
            }
            setGameData()
        }, [user] // в тестовых целях
    )

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
        setGamePhase,
        lastReceivedMessage,
        currentPlayerId,
        session,
        zoomFlag
    }
}