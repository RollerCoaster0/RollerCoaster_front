import {useEffect, useState} from "react";
import {devConsts, getStaticLocations, getStaticPlayers} from "../util/util";
import {gamePhaseType} from "../contexts/GameContext";
import img from "../components/chat/img/img.png";
import img1 from "../components/chat/img/img.png";
import {useLongPolling} from "./useLongPolling";

export function useInitGame() {
    const [players, setPlayers] = useState(getStaticPlayers())
    const [locations, setLocations] = useState(getStaticLocations())
    const [cellSize, setCellSize] = useState(devConsts.defaultCellSize)
    const [currentLocation, setCurrentLocation] = useState(locations[0])
    const [pickedPlayer, setPickedPlayer] = useState(players[0])
    const [gamePhase, setGamePhase] = useState(gamePhaseType.MAKING_MOVE)
    const user = {id: 0, name: 'user', avatar: img}
    const currentUser = {id: 1, name: 'Mark', avatar: img1}
    const [lastReceivedChatAction, setLastReceivedChatAction] = useState()
    const [messages, setMessages] = useState(
        [{sender: user, text: 'hi'}, {sender: user, text: 'hi'}, {
            sender: currentUser,
            text: 'lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 '
        }]
    );

    const event = useLongPolling()

    useEffect(() => {
        if (event) {
            for (const eventKey in event) {
                //гарантируется, что за раз придет только один ивент
                if (event[eventKey]) {
                    switch (eventKey) {
                        case 'questStatus':
                            handleSessionStatusUpdated(event.questStatus)
                            break
                        case 'move':
                            handleMoveEvent(event.move)
                            break
                        case 'chatAction':
                            handleChatActionEvent(event.chatAction)
                            setLastReceivedChatAction(event.chatAction)
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

    const updateChatMessages = () => {
        const messageData = event.chatAction.newMessage.message
        const player = messageData.player
        const message = {id: messageData?.id, sender: {name: player.name, id: player.userId, text: messageData.text}}
    }

    const handleChatActionEvent = (event) => {

    }
    const handleMoveEvent =(event) => {
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
        messages,
        setMessages,
        lastReceivedChatAction
    }
}