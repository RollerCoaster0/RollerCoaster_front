import {useContext, useEffect, useRef, useState} from "react";
import {devConsts,} from "../util/util";
import {useLongPoll,} from "./useLongPolling";
import {
    fetchAvatar,
    fetchGame,
    fetchLocationsBackground, fethcANPCs, setAvatars,
} from "../api/game";
import {UserContext} from "../contexts/UserContext";
import green from '../devassets/green_player.png'

export function useInitGame(_session, _players) { //session prop
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
    const isGm = user.id === session.gameMasterUserId
    const event = useLongPoll(pollingFlag)
    const [skills, setSkills] = useState([])
    const [quests, setQuests] = useState()

    useEffect(() => {
        if (event) {
            console.log('LP EVENT: ', event)
            for (const eventKey in event) {
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
                        case 'changeHealthPoints':
                            handleHpChange(event.changeHealthPoints)
                            break
                    }
                    break
                }
            }
        }
    }, [event])

    const handleHpChange = (event) => {
        if (event.player) {
            const chPlayer = event.player
            console.log(event)
            setPlayers(players => players.map(p => p.id === chPlayer.id ? {...p, healthPoints: chPlayer.healthPoints} : p))
        } else {
            const chNpc = event.anpc
            setNpcs(npcs => npcs.map(n => n.id === chNpc.id ? {...n, healthPoints: chNpc.healthPoints }: n))
        }
    }

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
        console.log(event)
        setSession(event)
    }
    // console.log('PICKED', pickedEntity)
    // console.log('isGm', user.id, session, isGm)
    // console.log('PLAYERS', players)
    // console.log('NPCS', npcs)
    // console.log('GAME', game)
    // console.log('LOCATIONS', locations)
    const handleQuestStatusEvent = (event) => {

    }


    useEffect(() => {
            //game
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

                //anpcs
                response = await fethcANPCs(session.id)
                if (!response.ok) {
                    //TODO: handle
                } else {
                    let anpcs = await response.json()
                    setNpcs(data.nonPlayableCharacters?.map((npc => {
                            const matchedAnpc = anpcs.find(a => a.nonPlayableCharacterId === npc.id)
                            console.log('FOUND', matchedAnpc)
                            let npcId = npc.id
                            let n = {
                                ...npc,
                                pos: {x: matchedAnpc.currentXPosition, y: matchedAnpc.currentYPosition},
                                id: matchedAnpc.id,
                                avatar: green,
                                healthPoints: matchedAnpc.healthPoints,
                                npcId
                            }
                            console.log('CHANGED', n)
                            return n
                        }
                    )))
                }

                //skills

                setSkills(data.skills)
                console.log('PLSDRSADF AAARAE', players)
                await setAvatars(players)
                setPlayers(structuredClone(players))
                setPlayers(players => players?.map(((p, i) => {
                    return {...p, characterClass: data.classes[i]}
                })))

                //backgrounds
                let backgrounds = await fetchLocationsBackground(data.locations.map(l => l.mapFilePath))
                let locs = data.locations.map((loc, i) => {
                    return {...loc, background: backgrounds[i], size: [loc.width, loc.height]}
                })
                setLocations(locs)

                currentPlayerId.current = players?.find(p => {
                    return p.userId === user?.id
                })?.id
                console.log('LOCS', locs)
                setCurrentLocation(locs.find(l => l.id === data.baseLocationId))
            }
            setGameData()
        }, [user]
    )
    console.log(players)
    console.log(skills, 'SKILLS')

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