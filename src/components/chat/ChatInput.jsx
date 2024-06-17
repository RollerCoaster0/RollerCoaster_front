import React, {useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {UserContext} from "../../contexts/UserContext";
import {sendTextMessage} from "../../api/updates";


const ChatInput = ({sessionId}) => {
    const {user} = useContext(UserContext)
    const [message, setMessage] = useState("")
    const handleMessageSending = async () => {
        setMessage('')
        const response = await sendTextMessage(message, sessionId)
        if (!response.ok) {
            //TODO: proccess and alert
        }
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