import React from 'react';
import {Avatar} from "@mui/material";

const ChatMessage = ({sender, isOwn, time, children}) => {
    return (
        <div className={`chat-message-wrapper ${isOwn ? 'own-wrapper' : 'other-wrapper'}`}>
            <li className={`chat-message ${isOwn ? 'own-message' : 'other-message'}`}>
                <Avatar src={sender.avatar ? sender.avatar : ''} alt={sender?.name}/>
                <div className={`chat-message__text-area ${isOwn ? 'own-text-area' : 'other-text-area'}`}>
                    {children}
                </div>
            </li>
        </div>
    );
};

export default ChatMessage;