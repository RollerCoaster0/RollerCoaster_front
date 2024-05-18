import React from 'react';

const ChatMessage = ({sender, message, isOwn}) => {
    return (
        <div className={`chat-message-wrapper ${isOwn ? 'own-wrapper' : 'other-wrapper'}`}>
            <li className={`chat-message ${isOwn ? 'own-message' : 'other-message'}`}>
                <img className='chat-message__avatar' src={sender?.avatar}/>
                <div
                    className={`chat-message__text-area ${isOwn ? 'own-text-area' : 'other-text-area'}`}>{message}</div>
            </li>
        </div>
    );
};

export default ChatMessage;