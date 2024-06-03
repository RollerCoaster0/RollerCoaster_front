import {useEffect, useRef, useState} from "react";
import {devConsts, getStaticLocations, getStaticPlayers} from "../util/util";
import {gamePhaseType} from "../contexts/GameContext";
import img from "../components/chat/img/img.png";
import img1 from "../components/chat/img/img.png";
import red_player from '../devassets/red_player.png'
import {useLongPolling} from "./useLongPolling";
import {fetchClasses, fetchGame, fetchLocationsBackground, fetchPlayers, fetchSessionInfo} from "../api/game";

export function useInitGame() {
    let sessionId = 1
    const [players, setPlayers] = useState([])
    const currentPlayerId = useRef();
    const [locations, setLocations] = useState([])
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState()
    const [pickedPlayer, setPickedPlayer] = useState(players[0])
    const [gamePhase, setGamePhase] = useState(gamePhaseType.MAKING_MOVE)
    const user = {id: 3, name: 'fdfdfdfsfdfasf', avatar: img}
    const currentUser = {id: 1, name: 'Mark', avatar: img1}
    const [lastReceivedMessage, setLastReceivedMessage] = useState()

    const [session, setSession] = useState()
    const [game, setGame] = useState({id: 4})

    const event = useLongPolling()

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
                            handleChatActionEvent(event.newMessage)
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

    const handleChatActionEvent = (event) => {

    }
    const handleMoveEvent = (event) => {
        const movedPlayer = event.player
        setPlayers(players => players.map(p => {
            if (p.id === movedPlayer.id) {
                return {...p, pos: {x: event.currentXPosition, y: event.currentYPosition}}
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
                let response = await fetchSessionInfo(sessionId)
                if (!response.ok) {
                    //TODO: handle
                    console.log('FAILED TO FETCH SESSION!!!', response)
                    return
                }
                let data = await response.json()
                setSession(data)
                response = await fetchGame(data.gameId)
                if (!response.ok) {
                    //TODO: handle
                    console.log('FAILED TO FETCH GAME', response)
                    return
                }
                data = await response.json()
                let players = await fetchPlayers(sessionId)
                let classes = await fetchClasses(players.map(p => p.characterClassId))
                let backgrounds = await fetchLocationsBackground(data.locations.map(l => l.mapFilePath))
                setPlayers(players.map(((p, i) => {
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
                console.log('BACKGROUNDS',backgrounds)
                currentPlayerId.current = players.find(p => p.userId === user.id).id
                if (!currentPlayerId.current) {
                    throw new Error('не найден текущий игрок')
                }
                setCurrentLocation(locs[0])
            }


            setGameData()
        }, []
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
        lastReceivedChatAction: lastReceivedMessage,
        currentPlayerId
    }
}