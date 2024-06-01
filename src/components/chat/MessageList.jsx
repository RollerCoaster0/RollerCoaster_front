import img1 from "./img/img.png"

import React from 'react';
import ChatMessage from "./ChatMessage";
import {messageType} from "./Chat";
import RegularChatMessage from "./RegularChatMessage";
import DiceRollChatMessage from "./DiceRollChatMessage";

const MessageList = ({messages}) => {
    const currentUser = {id: 1, name: 'Mark', avatar: img1}
    return (
        <ul className='chat-window__messages-list'>
            {messages.map(m =>
                <ChatMessage message={m.data.text} sender={m.sender}
                             isOwn={m.sender.id === currentUser.id} time={m.time}>
                    {m.type === messageType.REGULAR_MESSAGE
                        ? <RegularChatMessage text={m.data.text}/>
                        : <DiceRollChatMessage result={m.data.result}/>}
                </ChatMessage>
            )
            }
        </ul>
    );
};

export default MessageList;