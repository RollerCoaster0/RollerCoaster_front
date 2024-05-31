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
    const [messages, setMessages] = useState(
        [{sender: user, text: 'hi'}, {sender: user, text: 'hi'}, {
            sender: currentUser,
            text: 'lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 lorem2 '
        }]
    );
    const [gameEventsQueue, setGameEventsQueue] = useState([])

    const eventUpdate = useLongPolling()

    useEffect(() => {
        if (eventUpdate !== undefined) {
            //↓↓↓↓ гарантируется, что за раз будет отправлен только один ивент
            if (eventUpdate.chatAction !== null) {
                const action = eventUpdate.chatAction
                if (action.roll !== null) {
                    //TODO: добавить сообщение о ролле в чат
                } else if (action.newMessage !== null) {
                    const message = action.newMessage.message
                    const player = message.player
                    setMessages(messages => [...messages, {
                        id: message.id,
                        sender: {id: player.userId, name: player.name},
                        text: message.text,
                        time: message.time
                    }])
                } else if (action.skillUsed !== null) {
                    //TODO: добавить отображение использование скилла в чат
                }
            } else if (eventUpdate.questStatus !== null) {
                //TODO: придумать, че там по квестам
            } else if (eventUpdate.sessionStarted !== null) {
                    setGamePhase(gamePhaseType.WAITING_FOR_MOVE)
            } else if (eventUpdate.move !== null) {
                //это только для игрока, есть же еще и неписи
                const movedPlayer = eventUpdate.move.player
                setPlayers(players => { players.map(p => {
                    if (p.id === movedPlayer.id) {
                        return {...p, pos: {x: movedPlayer.currentXPosition, y: movedPlayer.currentYPosition}}
                    }
                    return p
                })})
            } else {
                //кричать
            }
        }
    }, [eventUpdate])

    const updateChatMessages = () => {
        const messageData = eventUpdate.chatAction.newMessage.message
        const player = messageData.player
        const message = {id: messageData?.id, sender: {name: player.name, id: player.userId, text: messageData.text}}
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
        gameEventsQueue
    }
}