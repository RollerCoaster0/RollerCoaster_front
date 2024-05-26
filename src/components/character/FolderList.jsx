import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {Button, TextField} from "@mui/material";
import {getCredentials} from "../../contexts/UserContext";
import {devConsts} from "../../util/util";
import {useEffect, useState} from "react";

export default function FolderList() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const [Skill,setSkills] = useState();
    useEffect(() => {
    async function initSkills() {
        let Id = 2;
        const token_game = getCredentials()?.token;
        console.log(token_game)
        let skill_response = await fetch(devConsts.api + '/skills/' + Id,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token_game}`,
            }
        })

        let skill_data = skill_response.json();

        setSkills(await skill_data);


    }
    initSkills().then(r => console.log(Skill));
},
[]);




return (
        <List sx={{ width: '100%', maxWidth: "360px" }}>
            <ListItem>
                <ListItemAvatar>

                </ListItemAvatar>
                <ListItemText primary="Skill" secondary={Skill?.name}/>
                <div className="folder_list">
                </div>
                <Button color="success" onClick={toggleVisibility}
                sx={{
                    backgroundColor: "darkolivegreen",
                    height:"30px",
                    width:"100%",
                    color:"rgba(157,33,33,0.67)"

                }}
                >-></Button>
                {isVisible && <div>{Skill?.description}</div>}
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary="Skill" secondary="Name skill"/>
                <div className="folder_list"></div>
                <Button color="success"
                        sx={{
                            backgroundColor: "darkolivegreen",
                            height:"30px",
                            width:"100%",
                            color:"rgba(157,33,33,0.67)"

                        }}
                >Далее</Button>
            </ListItem>
            <ListItem>
                <ListItemAvatar>

                </ListItemAvatar>
                <ListItemText primary="Skill" secondary="Name skill"/>
                <div className="folder_list"></div>
                <Button color="success"
                        sx={{
                            backgroundColor: "darkolivegreen",
                            height:"30px",
                            width:"100%",
                            color:"rgba(157,33,33,0.67)"

                        }}
                >Далее</Button>
            </ListItem>
        </List>
    );
}
