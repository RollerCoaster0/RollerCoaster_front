import img1 from "./img/img.png"

import React from 'react';
import ChatMessage from "./ChatMessage";
import DiceRollChatMessage from "./DiceRollChatMessage";
import TextMessage from "./TextMessage";

const MessageList = ({messages}) => {
    const currentPlayer = {id: 1, name: 'Mark', avatar: img1}
    return (
        <ul className='chat-window__messages-list'>
            {messages.map(m => {
                    if (m.rollMessage) {
                        let senderPlayer = m.rollMessage.senderPlayer
                        let senderANPC = m.rollMessage.senderANPC
                        return <ChatMessage time={null} sender={senderPlayer ?? senderANPC}
                                            isOwn={senderPlayer?.id === currentPlayer.id}>
                            <DiceRollChatMessage result={m.rollMessage.result}/>
                        </ChatMessage>
                    } else if (m.textMessage) {
                        return <ChatMessage time={m.textMessage.time} sender={m.textMessage.senderPlayer}
                                            isOwn={m.textMessage.senderPlayer.id === currentPlayer.id}>
                            <TextMessage text={m.textMessage.text}/>
                        </ChatMessage>
                    }
                    //....
                }
            )
            }
        </ul>
    );
};

export default MessageList;