import './Chat.css'
import {Button, Drawer, drawerClasses, Paper} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import MessageList from "./MessageList";
import ChatIcon from '@mui/icons-material/Chat';
import ChatInput from "./ChatInput";
import img from "./img/img.png";
import img1 from "./img/img.png";
import {GameContext} from "../../contexts/GameContext";
import {fetchChatActions} from "../../api/updates";

export const messageType = {
    REGULAR_MESSAGE: 0,
    DICE_ROLL: 1,
    SKILL_USED: 2,
}

const Chat = () => {
    const user = {id: 0, name: 'user', avatar: img}
    const currentUser = {id: 1, name: 'Mark', avatar: img1}
    const [chatOpened, setChatOpened] = useState(false);
    const {lastChatAction} = useContext(GameContext)
    const [messages, setMessages] = useState([{
        id: 0,
        type: messageType.REGULAR_MESSAGE,
        sender: user,
        time: '2024-06-01T09:43:20.173Z',
        data: {text: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem'}
    },
        {
            id: 1,
            type: messageType.DICE_ROLL,
            sender: user,
            time: '2024-06-01T09:43:21.173Z',
            data: {anpc: null, result: {result: 3, die: 6}}
        }])

    useEffect(() => {
        if (lastChatAction) {
            setMessages(messages => [...messages, chatActionToMessage(lastChatAction)])
        }
    }, [lastChatAction]);

    useEffect(() => {
        const sessionId = 0
        const setChatActions = async () => {
            const response = await fetchChatActions(sessionId)
            if (!response.ok) {
                //TODO: handle error
            } else {
                const actions = await response.json()
                actions.map(a => chatActionToMessage(a))
                setMessages(actions)
            }
        }
        setChatActions()
    }, []);

    return (
        <>
            <ChatIcon sx={chatIconStyle} onClick={() => setChatOpened(!chatOpened)}>Open chat</ChatIcon>
            <Drawer open={chatOpened} onClose={() => setChatOpened(false)} anchor={'left'}>
                <div className="chat-window">
                    <Paper className='chat-window__chat-field'>
                        <MessageList messages={messages}/>
                    </Paper>
                    <div className='chat-window__bottom-panel'>
                        <div className='chat-window__bottom-panel__input__panel'>
                            <ChatInput messages={messages} setMessages={setMessages}/>
                        </div>
                        <div className='chat-window__bottom-panel__dice-panel'>
                            <Button sx={throwDiceButton}>Бросить D20</Button>
                            <Button sx={throwDiceButton}>Бросить D6</Button>
                            <Button sx={throwDiceButton}>Бросить D4</Button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
}


const throwDiceButton = {
    backgroundColor: '#993E3E',
    borderRadius: '5px',
    height: '40px',
    width: '120px',
    color: 'black',
    fontSize: '12px',
    '&:hover': {
        backgroundColor: '#993E3E',
    },

}
const chatIconStyle = {
    color: 'white',
    width: '60px',
    height: '60px',
    zIndex: 1000,
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.3, 1.3)'
    }
}


function chatActionToMessage(chatAction) {
    let sender, message
    if (chatAction.roll) {
        if (chatAction.roll.activeNonPlayableCharacter) {
            const anpc = chatAction.roll.activeNonPlayableCharacter
            sender = {id: anpc.nonPlayableCharacterId, name: 'NPC', avatar: null}
        } else {
            const player = chatAction.roll.player
            sender = {id: chatAction.player.id, name: player.name}
        }
        return {id: -1, sender, time: null, data: chatAction.roll.result}
    } else if (chatAction.newMessage) {
        return {
            id: chatAction.newMessage.messageId, text: chatAction.newMessage.text, time: chatAction.newMessage.time,
            sender: {id: chatAction.newMessage.player.id, name: chatAction.newMessage.player?.name}
        }
    }
    return null
}

export default Chat;