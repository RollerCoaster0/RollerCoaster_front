// import React, {useEffect, useState} from 'react';
// import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
// import {getCredentials} from "../../contexts/UserContext";
// import {devConsts} from "../../util/util";
//
//
// const Classes = () => {
//
//
//     const [character, setCharacter] = useState('')
//
//     const game =
//         {
//             "id": 0,
//             "creatorId": 0,
//             "name": "string",
//             "description": "string",
//             "baseLocationId": 0,
//             "locations": [
//                 {
//                     "id": 0,
//                     "gameId": 0,
//                     "name": "string",
//                     "description": "string",
//                     "mapFilePath": "string",
//                     "width": 0,
//                     "height": 0,
//                     "basePlayersXPosition": 0,
//                     "basePlayersYPosition": 0
//                 }
//             ],
//             "classes": [
//                 {
//                     "id": 0,
//                     "gameId": 0,
//                     "name": "Бамбук",
//                     "description": "БФмбук описание"
//                 },
//                 {
//                     "id": 1,
//                     "gameId": 0,
//                     "name": "Диджей Ебан",
//                     "description": "Ебан"
//                 }
//                 ,
//                 {
//                     "id": 2,
//                     "gameId": 0,
//                     "name": "Диджей Кабан",
//                     "description": "string"
//                 }
//                 ,
//                 {
//                     "id": 3,
//                     "gameId": 0,
//                     "name": "Диджей Json",
//                     "description": "string"
//                 }
//             ],
//             "quests": [
//                 {
//                     "id": 0,
//                     "gameId": 0,
//                     "name": "string",
//                     "description": "string",
//                     "hiddenDescription": "string"
//                 }
//             ],
//             "items": [
//                 {
//                     "id": 0,
//                     "gameId": 0,
//                     "name": "string",
//                     "description": "string",
//                     "itemType": "string"
//                 }
//             ],
//             "nonPlayableCharacters": [
//                 {
//                     "id": 0,
//                     "gameId": 0,
//                     "name": "string",
//                     "baseLocationId": 0,
//                     "baseXPosition": 0,
//                     "baseYPosition": 0,
//                     "avatarFilePath": "string"
//                 }
//             ],
//             "skills": [
//                 {
//                     "id": 0,
//                     "gameId": 0,
//                     "name": "Спел1",
//                     "description": "string",
//                     "availableOnlyForCharacterClassId": 0,
//                     "availableOnlyForNonPlayableCharacterId": 0
//                 },
//                 {
//                     "id": 0,
//                     "gameId": 0,
//                     "name": "Спел2",
//                     "description": "string",
//                     "availableOnlyForCharacterClassId": 0,
//                     "availableOnlyForNonPlayableCharacterId": 0
//                 },
//                 {
//                     "id": 1,
//                     "gameId": 0,
//                     "name": "string1",
//                     "description": "string1",
//                     "availableOnlyForCharacterClassId": 0,
//                     "availableOnlyForNonPlayableCharacterId": 0
//                 },
//                 {
//                     "id": 1,
//                     "gameId": 0,
//                     "name": "string1",
//                     "description": "string1",
//                     "availableOnlyForCharacterClassId": 0,
//                     "availableOnlyForNonPlayableCharacterId": 0
//                 },
//                 {
//                     "id": 1,
//                     "gameId": 0,
//                     "name": "string1",
//                     "description": "string1",
//                     "availableOnlyForCharacterClassId": 0,
//                     "availableOnlyForNonPlayableCharacterId": 0
//                 }
//             ]
//         }
//     const handleChange = (event) => {
//         setCharacter(game.classes[event.target.value]);
//         console.log(game.classes[event.target.value])
//     };
//
//
//     return (
//         <div>
//             <FormControl sx={{m: 1, minWidth: 120, backgroundColor: "rgba(102,157,6,0.54)"}} size="small">
//                 <InputLabel id="demo-select-small-label">Class</InputLabel>
//                 <Select
//                     labelId="demo-select-small-label"
//                     id="demo-select-small"
//
//                     label="Class"
//                     onChange={handleChange}
//                 >
//
//             {game.classes.map((item, index) =>
//                 <MenuItem value={index}>
//                     <h1 className="Class_Selecter">
//                     {item.name}
//                 </h1>
//                 </MenuItem>
//
//             )}
//
//                 </Select>
//             </FormControl>
//         </div>
//
//     );
//
// }
// export default Classes;
