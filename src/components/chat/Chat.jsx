import './Chat.css'
import {Button, Drawer, drawerClasses, Paper} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
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
    const user = {id: 0, name: 'user', avatar: img}
    const currentUser = {id: 1, name: 'Mark', avatar: img1}
    const [chatOpened, setChatOpened] = useState(false);
    const {lastReceivedMessage} = useContext(GameContext)
    const [messages, setMessages] = useState([
        {
            "id": 0,
            "sessionId": 0,
            "rollMessage": {
                "senderPlayer": {
                    "id": 0,
                    "userId": 0,
                    "sessionId": 0,
                    "name": "string",
                    "level": 0,
                    "healthPoints": 0,
                    "currentXPosition": 0,
                    "currentYPosition": 0,
                    "characterClassId": 0
                },
                "senderANPC": null,
                "result": {
                    "result": 0,
                    "die": 0
                }
            },
            "textMessage": null,
            "usedSkillMessage": null,

        },
        {
            "id": 0,
            "sessionId": 0,
            "rollMessage" : null,
            "textMessage": {
                "senderPlayer": {
                    "id": 0,
                    "userId": 0,
                    "sessionId": 0,
                    "name": "string",
                    "level": 0,
                    "healthPoints": 0,
                    "currentXPosition": 0,
                    "currentYPosition": 0,
                    "characterClassId": 0
                },
                "text": "string",
                "time": "2024-06-02T18:40:20.199Z"
            },
            "usedSkillMessage":null
        }
    ])
    useEffect(() => {
        if (lastReceivedMessage) {
            setMessages(messages => [...messages, lastReceivedMessage])
        }
    }, [lastReceivedMessage]);

    useEffect(() => {
        const sessionId = 0
        const setChatMessages = async () => {
            const response = await fetchChatMessages(sessionId)
            if (!response.ok) {
                //TODO: handle error
            } else {
                const messages = await response.json()
                setMessages(messages)
            }
        }
        setChatMessages()
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