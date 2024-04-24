import './Chat.css'
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import MessageList from "./MessageList";


const Chat = () => {
    const [newMessage, setNewMessage] = useState(""); // Состояние для нового сообщения
    const [messages, setMessages] = useState(["Привет!", "Как дела?", "Все хорошо, спасибо!"]);
    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };
    const addMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, newMessage]);
            setNewMessage("");
        }
    };

    return(
<main className="chat">
    <div className="chat__window">

        <div className="chat__window__input>">

            <div className="chat__window__input__input">
                <div className="chat__window__input__input__wrapper">
                <TextField id="outlined-basic"  variant="standard" InputProps={{disableUnderline: true}}
                           value={newMessage}
                           onChange={(e) => handleMessageChange(e)}
                           sx={{
                               width: "550px",
                               height:"30px",
                               alignSelf: "center",


                           }}/></div>
                <div className="chat__window__input__input__button">
                <Button variant="contained" color="success"
                        onClick={addMessage}
                        sx={{
                            backgroundColor: "darkolivegreen",
                            width:"100px",
                            height:"30px",
                            fontSize:"10px"
                        }}>от своего имени </Button>
                <Button variant="contained" color="success"
                        onClick={addMessage}
                        sx={{
                            backgroundColor: "darkolivegreen",
                            width:"100px",
                            height:"30px",
                            fontSize:"10px"
                        }}>от имени персонажа </Button>
                </div>
            </div>
            <div className="chat__window__footer">
                <Button variant="outlined"

                sx={[{
                    backgroundColor: "#993e3e",
                    height:"30px",
                    color:"black",
                    borderColor: "transparent"

                },
                    {
                        '&:hover': {
                            color: 'black',
                            backgroundColor: "rgb(161,8,8)",
                            borderColor: "transparent"
                        },
                    },
                ]}>
                    Бросить D20
                </Button>
                <Button variant="outlined" color="error"
                        sx={[{
                            backgroundColor: "#993e3e",
                            height:"30px",
                            color:"black",
                            borderColor: "transparent"

                        },
                            {
                                '&:hover': {
                                    color: 'black',
                                    backgroundColor: "rgb(161,8,8)",
                                    borderColor: "transparent"
                                },
                            },
                        ]}>
                    Бросить D6
                </Button>
                <Button variant="outlined" color="error"
                        sx={[{
                            backgroundColor: "#993e3e",
                            height:"30px",
                            color:"black",
                            borderColor: "transparent"

                        },
                            {
                                '&:hover': {
                                    color: 'black',
                                    backgroundColor: "rgb(161,8,8)",
                                    borderColor: "transparent"
                                },
                            },
                        ]}>
                    Бросить D4
                </Button>
            </div>
        </div>

        <div className="chat__window__chat_field" style={{
            position: "relative"
        }}>
            <MessageList messages={messages}></MessageList>

        </div>

    </div>

</main>
    );
};
export default Chat;