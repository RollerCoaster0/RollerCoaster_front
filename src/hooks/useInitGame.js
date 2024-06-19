import {useContext, useEffect, useRef, useState} from "react";
import {devConsts,} from "../util/util";
import {useLongPoll,} from "./useLongPolling";
import {
    fetchGame,
    fetchLocationsBackground,
} from "../api/game";
import {UserContext} from "../contexts/UserContext";
import green from '../devassets/green_player.png'

export function useInitGame(_session, _players) { //session prop
    console.log(_players)
    const [players, setPlayers] = useState(_players)
    const [session, setSession] = useState(_session)
    const currentPlayerId = useRef()
    const [locations, setLocations] = useState([])
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState()
    const pickedPlayerId = useRef();
    const [pickedEntity, setPickedEntity] = useState()
    const [gamePhase, setGamePhase] = useState()
    const [npcs, setNpcs] = useState()
    const [shownEntity, setShownEntity] = useState()
    const [lastReceivedMessage, setLastReceivedMessage] = useState()
    const {user} = useContext(UserContext)
    const [game, setGame] = useState()
    const pollingFlag = useRef(true)
    const isGm = user.id === session.id
    const event = useLongPoll(pollingFlag)
    const [showedEntity, setShowedEntity] = useState()
    const [skills, setSkills] = useState([])

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
                            if (event.move.player) {
                                handleMoveEvent(event.move)
                            } else {
                                handleNpcMoveEvent(event.move)
                            }
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
    const handleNpcMoveEvent = (event) => {
        const movedNPC = event.anpc
        setNpcs(npcs => npcs.map(n => {
            if (n.id === movedNPC.id) {
                return {...n, pos: {x: event.x, y: event.y}}
            }
            return n
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
                setNpcs(data.nonPlayableCharacters?.map(npc => {return {...npc, pos: {x: npc.baseXPosition, y: npc.baseYPosition}, avatar: green }} ))
                setSkills(data.skills)
                let avatars = []
                // if (players) {
                //     for (let p of players) {
                //         response = await fetchAvatar(p.avatarFilePath)
                //         if (!response.ok) {
                //             //TODO: handle
                //         } else {
                //             avatars.push(URL.createObjectURL(await response.blob()))
                //         }
                //     }
                // }
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
    console.log(pickedEntity)
    return {
        players,
        setPlayers,
        locations,
        setLocations,
        cellSize,
        setCellSize,
        currentLocation,
        setCurrentLocation,
        gamePhase,
        setGamePhase,
        pickedPlayerId,
        lastReceivedMessage,
        currentPlayerId,
        session,
        game,
        isGm,
        pickedEntity,
        setPickedEntity,
        npcs,
        setNpcs,
        shownEntity,
        setShownEntity,
        skills

    }
}