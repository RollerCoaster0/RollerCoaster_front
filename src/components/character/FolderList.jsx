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

   const game =
       {
           "id": 0,
           "creatorId": 0,
           "name": "string",
           "description": "string",
           "baseLocationId": 0,
           "locations": [
               {
                   "id": 0,
                   "gameId": 0,
                   "name": "string",
                   "description": "string",
                   "mapFilePath": "string",
                   "width": 0,
                   "height": 0,
                   "basePlayersXPosition": 0,
                   "basePlayersYPosition": 0
               }
           ],
           "classes": [
               {
                   "id": 0,
                   "gameId": 0,
                   "name": "string",
                   "description": "string"
               }
           ],
           "quests": [
               {
                   "id": 0,
                   "gameId": 0,
                   "name": "string",
                   "description": "string",
                   "hiddenDescription": "string"
               }
           ],
           "items": [
               {
                   "id": 0,
                   "gameId": 0,
                   "name": "string",
                   "description": "string",
                   "itemType": "string"
               }
           ],
           "nonPlayableCharacters": [
               {
                   "id": 0,
                   "gameId": 0,
                   "name": "string",
                   "baseLocationId": 0,
                   "baseXPosition": 0,
                   "baseYPosition": 0,
                   "avatarFilePath": "string"
               }
           ],
           "skills": [
               {
                   "id": 0,
                   "gameId": 0,
                   "name": "спел1",
                   "description": "описание1",
                   "availableOnlyForCharacterClassId": 0,
                   "availableOnlyForNonPlayableCharacterId": 0
               },
               {
                   "id": 1,
                   "gameId": 0,
                   "name": "спел2",
                   "description": "описание 2",
                   "availableOnlyForCharacterClassId": 0,
                   "availableOnlyForNonPlayableCharacterId": 0
               }
           ]
       }
    // var result = Object.keys(game).map(function(key){
    //     return game[key].classes;
    // });


return (
    <List sx={{width: '100%', maxWidth: "360px"}}>






                <div className="folder_list">

                </div>
                {game.skills.map((skill, index) =>
                        <ListItem>
                    <ListItemText primary={skill.name} key={skill.id} secondary={skill.description}>></ListItemText>

                    </ListItem>
                    )}

    </List>
);
}
