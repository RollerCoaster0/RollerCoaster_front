import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {Button, TextField} from "@mui/material";

export default function FolderList() {
    return (
        <List sx={{ width: '100%', maxWidth: "360px" }}>
            <ListItem>
                <ListItemAvatar>

                </ListItemAvatar>
                <ListItemText primary="Skill" secondary="Name skill" />
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
