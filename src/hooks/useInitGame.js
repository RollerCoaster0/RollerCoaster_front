import {useContext, useEffect, useRef, useState} from "react";
import {devConsts,} from "../util/util";
import {useLongPoll,} from "./useLongPolling";
import {fetchClasses, fetchGame, fetchLocationsBackground, fetchPlayers, fetchSessionInfo} from "../api/game";
import {UserContext} from "../contexts/UserContext";
import {gamePhaseType} from "../components/pages/gamepage/GamePage";

export function useInitGame(_session, _players) { //session prop
    console.log(_players)
    const [players, setPlayers] = useState(_players)
    const [session, setSession] = useState(_session)
    const currentPlayerId = useRef()
    const [locations, setLocations] = useState([])
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState()
    const [pickedPlayer, setPickedPlayer] = useState()
    const [gamePhase, setGamePhase] = useState()
    const [lastReceivedMessage, setLastReceivedMessage] = useState()
    const {user} = useContext(UserContext)

    const [game, setGame] = useState()
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
        setSession(event)
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
                setGame(data)
                // let fetchedPlayers = await fetchPlayers(session.id)
                // let classes = await fetchClasses(players.map(p => p.characterClassId))
                setPlayers(players => players?.map(((p, i) => {return{...p, characterClass: data.classes[i] }})))
                let backgrounds = await fetchLocationsBackground(data.locations.map(l => l.mapFilePath))
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

                currentPlayerId.current = players?.find(p => { console.log(user, p); return  p.userId === user?.id})?.id
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
        game
    }
}