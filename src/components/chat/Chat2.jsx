import React, {useState} from 'react';
import {Drawer} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Chat2 = () => {
    const [chatOpened, setChatOpened] = useState(false)
    return (
        <>
            <ChatIcon sx={{
                position: 'fixed',
                width: '60px',
                height: '60px',
                right: '20px',
                top: '70px',
                zIndex: 5000
            }} onClick={() => setChatOpened(!chatOpened)}>Open chat</ChatIcon>
            <Drawer open={chatOpened} onClose={() => setChatOpened(false)} anchor={'right'}>
                <div class="chat-window">
                    <div class="chat-messages">
                        <div class="message received">Hello! How can I help you today?</div>
                        <div class="message sent">Hi, I have a question about your products.</div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type your message..." className='chat-input__input-bar'/>
                        <button>Send</button>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default Chat2;