import './Chat.css'
import {Box, Button, Drawer, Paper, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import MessageList from "./MessageList";
import ImgList from "./ImgList";
import ChatIcon from '@mui/icons-material/Chat';
import img from "./img/img.png";
import img1 from "./img/img.png";
import ChatInput from "./ChatInput";
import {GameContext} from "../../contexts/GameContext";


const Chat = () => {
    const [newMessage, setNewMessage] = useState("");
    const user = {id: 0, name: 'user', avatar: img}
    const {messages, setMessages} = useContext(GameContext)
    const currentUser = {id: 1, name: 'Mark', avatar: img1} //заглушка, юзер будет браться из контекста
    const [chatOpened, setChatOpened] = useState(false);
    return (
        <>
            {!chatOpened ?
                <ChatIcon sx={chatIconStyle} onClick={() => setChatOpened(!chatOpened)}>Open chat</ChatIcon> : null}
            <Drawer open={chatOpened} onClose={() => setChatOpened(false)} anchor={'right'}>
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
    position: 'fixed',
    width: '60px',
    height: '60px',
    right: '20px',
    top: '70px',
    zIndex: 5000
}
export default Chat;