import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import img1 from "./img/img.png";

const ChatInput = ({messages, setMessages}) => {
    const currentUser = {id: 1, name: 'Mark', avatar: img1} //заглушка
    const [message, setMessage] = useState("")
    const handleMessageSending = () => {
        if (message === '') return
        //send update to server
        setMessages([...messages, {sender: currentUser, text: message}])
    }

    return (
        <>
            <div className='chat-window__bottom-panel__input__panel__input-wrapper'>
                <TextField value={message} onChange={e => setMessage(e.target.value)}
                           sx={textFieldStyle} variant='standard'
                           InputProps={{disableUnderline: true}}/>
            </div>
            <div className='chat-window__bottom-panel__input__panel__buttons'>
                <Button onClick={handleMessageSending} sx={sendButtonStyle}>От своего
                    имени</Button>
                <Button sx={sendButtonStyle}>От имени персонажа</Button>
            </div>
        </>
    );
};

const sendButtonStyle = {
    backgroundColor: 'darkolivegreen',
    borderRadius: '5px',
    height: '30px',
    fontSize: '8px',
    color: 'white',
    '&:hover': {
        backgroundColor: 'darkolivegreen',
    },
}
const textFieldStyle =
    {width: '90%', marginLeft: '5%', marginTop: '10px'}
export default ChatInput;