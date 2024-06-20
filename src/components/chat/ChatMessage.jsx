import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from "@mui/material";
import {GameContext} from "../../contexts/GameContext";

const ChatMessage = ({sender, isOwn, time, children, avatar}) => {
    console.log('AVATAR', avatar)
    return (
        <div className={`chat-message-wrapper ${isOwn ? 'own-wrapper' : 'other-wrapper'}`}>
            <li className={`chat-message ${isOwn ? 'own-message' : 'other-message'}`}>
                <Avatar src={avatar} alt={sender?.name}/>
                <div className={`chat-message__text-area ${isOwn ? 'own-text-area' : 'other-text-area'}`}>
                    {children}
                </div>
            </li>
        </div>
    );
};

export default ChatMessage;