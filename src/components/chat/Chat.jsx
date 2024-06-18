import './Chat.css'
import {Button, Drawer, Paper} from "@mui/material";
import React, {useContext, useEffect, useRef, useState} from "react";
import MessageList from "./MessageList";
import ChatIcon from '@mui/icons-material/Chat';
import ChatInput from "./ChatInput";
import img from "./img/img.png";
import img1 from "./img/img.png";
import {GameContext} from "../../contexts/GameContext";
import {fetchChatMessages} from "../../api/updates";

export const messageType = {
    REGULAR_MESSAGE: 0,
    DICE_ROLL: 1,
    SKILL_USED: 2,
}

const Chat = () => {
    const [chatOpened, setChatOpened] = useState(false)
    const {lastReceivedMessage, session} = useContext(GameContext)
    const [messages, setMessages] = useState([])
    const chatRef = useRef()
    useEffect(() => {
        if (lastReceivedMessage) {
            console.log('LRM', lastReceivedMessage)
            setMessages(messages => [...messages, lastReceivedMessage])
        }
    }, [lastReceivedMessage]);

    useEffect(() => {
        const setChatMessages = async () => {
            const response = await fetchChatMessages(session.id)
            if (!response.ok) {
                //TODO: handle error
            } else {
                const messages = await response.json()
                setMessages(messages.reverse())
            }
        }
        setChatMessages()
    }, []);

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    })

    return (
        <>
            <div title='Chat'>
                <ChatIcon sx={chatIconStyle} onClick={() => setChatOpened(!chatOpened)}>Open chat</ChatIcon>
            </div>
            <Drawer hideBackdrop={true} sx={{'& .MuiDrawer-paper': {border: 'none'}}} open={chatOpened} anchor={'left'}
                    variant={'persistent'}>
                <div className="chat-window">
                    <Paper ref={chatRef} className='chat-window__chat-field'>
                        <MessageList messages={messages}/>
                    </Paper>
                    <div className='chat-window__bottom-panel'>
                        <div className='chat-window__bottom-panel__input__panel'>
                            <ChatInput messages={messages} sessionId={session?.id}/>
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