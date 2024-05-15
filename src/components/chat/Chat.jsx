import './Chat.css'
import {Button, Drawer, TextField} from "@mui/material";
import React, {useState} from "react";
import MessageList from "./MessageList";
import ImgList from "./ImgList";
import ChatIcon from '@mui/icons-material/Chat';


const Chat = () => {
    const [newMessage, setNewMessage] = useState(""); // Состояние для нового сообщения
    const [messages, setMessages] = useState([]);
    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };
    const addMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, newMessage]);
            setNewMessage("");
        }

    };
    const [chatOpened, setChatOpened] = useState(false);
    // const [newPictures, setNewPictures] = useState("");
    // const [pictures, setImg] = useState([img, img1]);
    // const addImg = () => {
    //     if(newPictures.trim() !== ""){
    //     setImg([img, img1]);
    //     setNewPictures("");}
    // }
    function randNum(count) {
        var i = 0;
        for (i <= count; i++;) {
            var numb = [];
            numb[i] = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        }
        return numb;
    }

    var num;

    const [numbers, setNum] = useState([])
    const [newNumbers, setNewNumbers] = useState([]);

    const addNum = () => {
        setNum([...numbers, randNum()]);
        setNewNumbers([]);
    }
    const handleNumberChange = (e) => {
        setNewNumbers(e.target.value);
    };
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
                <main className="chat">
                    <div className="chat__window">


                        <div className="chat__window__input>">
                            <div className="chat__window__chat_field" style={{
                                position: "relative"
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px"
                                }}>
                                    <MessageList messages={messages}></MessageList>
                                    <ImgList number={numbers}></ImgList>
                                </div>
                            </div>
                            <div className="chat__window__input__input">
                                <div className="chat__window__input__input__wrapper">
                                    <TextField id="outlined-basic" variant="standard"
                                               InputProps={{disableUnderline: true}}
                                               value={newMessage}
                                               onChange={(e) => handleMessageChange(e)}
                                               sx={{
                                                   width: "550px",
                                                   height: "30px",
                                                   alignSelf: "center",
                                               }}/></div>
                                <div className="chat__window__input__input__button">
                                    <Button variant="contained" color="success"
                                            onClick={addMessage}
                                            sx={{
                                                backgroundColor: "darkolivegreen",
                                                width: "100px",
                                                height: "30px",
                                                fontSize: "10px"
                                            }}>от своего имени </Button>
                                    <Button variant="contained" color="success"
                                            onClick={addMessage}
                                            sx={{
                                                backgroundColor: "darkolivegreen",
                                                width: "100px",
                                                height: "30px",
                                                fontSize: "10px"
                                            }}>от имени персонажа </Button>
                                </div>
                            </div>
                            <div className="chat__window__footer">
                                <TextField variant="standard" id="outlined-basic" InputProps={{disableUnderline: true}}
                                           value={randNum()}
                                           onChange={(e) => handleNumberChange(e)}

                                           sx={{
                                               width: "25px",
                                               height: "30px",
                                               alignSelf: "center",
                                               backgroundColor: "white"

                                           }}/>
                                <Button variant="outlined"
                                        onClick={addNum}
                                        sx={[{
                                            backgroundColor: "#993e3e",
                                            height: "30px",
                                            color: "black",
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
                                            height: "30px",
                                            color: "black",
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
                                            height: "30px",
                                            color: "black",
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
                    </div>

                </main>
            </Drawer>
        </>
    );
}
export default Chat;