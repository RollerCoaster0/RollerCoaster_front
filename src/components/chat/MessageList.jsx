import img1 from "./img/img.png"

import React from 'react';
import ChatMessage from "./ChatMessage";

const MessageList = ({messages}) => {
    const currentUser = {id: 1, name: 'Mark', avatar: img1}
    return (
        <ul className='chat-window__messages-list'>
            {messages.map(m => <ChatMessage message={m.text} sender={m.sender}
                                            isOwn={m.sender.id === currentUser.id}/>)}
        </ul>
    );
};

export default MessageList;