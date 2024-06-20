import './Chat.css'
import {Button, Drawer, Paper, Tooltip} from "@mui/material";
import React, {useContext, useEffect, useRef, useState} from "react";
import MessageList from "./MessageList";
import ChatIcon from '@mui/icons-material/Chat';
import ChatInput from "./ChatInput";
import {GameContext} from "../../contexts/GameContext";
import {fetchChatMessages} from "../../api/updates";
import NotGmOnly from "../gamespace/NotGmOnly";

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
            <Tooltip title='Chat'>
                <ChatIcon sx={chatIconStyle} onClick={() => setChatOpened(!chatOpened)}>Open chat</ChatIcon>
            </Tooltip>
            <Drawer hideBackdrop={true} sx={{'& .MuiDrawer-paper': {border: 'none'}}} open={chatOpened} anchor={'left'}
                    variant={'persistent'}>
                <div className="chat-window">
                    <Paper ref={chatRef} className='chat-window__chat-field'>
                        <MessageList messages={messages}/>
                    </Paper>
                    <NotGmOnly>
                        <div className='chat-window__bottom-panel'>
                            <div className='chat-window__bottom-panel__input__panel'>
                                <ChatInput messages={messages} sessionId={session?.id}/>
                            </div>
                        </div>
                    </NotGmOnly>
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


export default Chat;