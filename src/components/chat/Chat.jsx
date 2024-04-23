import './Chat.css'
import {Button, TextField} from "@mui/material";
import {useState} from "react";


const Chat = () => {
    const DUMMY_DATA = [
        {
            senderId: "perborgen",
            text: "who'll win?"
        },
        {
            senderId: "janedoe",
            text: "who'll win?"
        }
    ]
    const [messages, setMessages] = useState(DUMMY_DATA)

    return(
<main className="chat">
    <div className="chat__window">


        <div className="chat__window__input>">

            <div className="chat__window__input__input">
                <div className="chat__window__input__input__wrapper">
                <TextField id="outlined-basic"  variant="standard" InputProps={{disableUnderline: true}}
                           sx={{
                               width: "550px",
                               height:"30px",
                               alignSelf: "center",

                           }}/></div>
                <div className="chat__window__input__input__button">
                <Button variant="contained" color="success"
                        sx={{
                            backgroundColor: "darkolivegreen",
                            width:"100px",
                            height:"30px",
                            fontSize:"10px"
                        }}>от своего имени </Button>
                <Button variant="contained" color="success"
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

        <div className="chat__window__chat_field">

        </div>

    </div>

</main>
    );
};
export default Chat;