import React, {useContext} from 'react';
import ChatMessage from "./ChatMessage";
import DiceRollChatMessage from "./DiceRollChatMessage";
import TextMessage from "./TextMessage";
import {UserContext} from "../../contexts/UserContext";
import UsedSkillMessage from "./UsedSkillMessage";
import {GameContext} from "../../contexts/GameContext";
import usedSkillMessage from "./UsedSkillMessage";

const MessageList = ({messages}) => {
    const {user} = useContext(UserContext)
    const {players, npcs} = useContext(GameContext)
    return (
        <ul className='chat-window__messages-list'>
            {messages.map(m => {
                    if (m.rollMessage) {
                        const senderPlayer = m.rollMessage.senderPlayer
                        const senderANPC = m.rollMessage.senderANPC
                        const avatar = players.find(p => p.id === m.rollMessage.senderPlayer?.id)?.avatar
                            ?? npcs.find(n => n.id === m.rollMessage.senderANPC?.id)?.avatar
                        return <ChatMessage time={null} sender={senderPlayer ?? senderANPC}
                                            isOwn={senderPlayer?.id === user.id} avatar={avatar}>
                            <DiceRollChatMessage result={m.rollMessage.result}/>
                        </ChatMessage>
                    } else if (m.textMessage) {
                        return <ChatMessage time={m.textMessage.time} sender={m.textMessage.senderPlayer}
                                            isOwn={m.textMessage.senderPlayer.id === user.id}>
                            <TextMessage text={m.textMessage.text}/>
                        </ChatMessage>
                    } else if (m.usedSkillMessage) {
                        let u = m.usedSkillMessage
                        const senderPlayer = u.player
                        const senderANPC = u.anpc
                        console.log('SENDER OF SKILL', senderPlayer ?? senderANPC)
                        const avatar = players.find(p => p.id === senderPlayer?.id)?.avatar
                            ?? npcs.find(n => n.id === senderANPC?.id)?.avatar
                        return <ChatMessage time={null} sender={senderPlayer ?? senderANPC} isOwn={u.userId === user.id} avatar={avatar}>
                            <UsedSkillMessage skillName={u.skill.name}/>
                        </ChatMessage>
                    }
                    return null
                    //....
                }
            )
            }
        </ul>
    );
};

export default MessageList;