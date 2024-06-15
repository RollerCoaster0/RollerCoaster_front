import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import img from "./logo/img.png";
import './character.css'
import FolderList from "./FolderList";
import {devConsts} from "../../util/util";
import {getCredentials} from "../../contexts/UserContext";
import {fetchGame, fetchSessionInfo} from "../../api/game";

export default function Character() {
    const [character, setCharacter] = useState({
        charname:"",
        }
    )
    const [name, setName] = useState('')
    const [classes, setClasses] = useState('')
    const [gameId, setGameId] = useState('')
    let sessionId = 2;


    const getSession = async () => {
        let resp = await fetchSessionInfo(sessionId)
        if (!resp.ok) {
            //TODO: handle
            console.log('FAILED TO FETCH SESSION', resp)
        }
        else {
            let session = await resp.json()
            setGameId(session)

                let response = await fetchGame(session.gameId)
                if (!response.ok) {
                    //TODO: handle
                    console.log('FAILED TO FETCH GAME', response)
                    return
                }
                let game = await response.json()
                setClasses(game)

            }
    }

    useEffect(() => {
        getSession()
    }, []);

    const handleChange = (event) => {
        setCharacter(classes.classes[event.target.value]);

        console.log("aaaaaaEtoNenado", classes.classes[event.target.value])


    };




const handleChangeButton = (event) =>{
  player().then(r => console.log(name))
};


 const [errors, setErrors] = useState('');
 const[submitting, setSubmitting] = useState(false);

 const validateValues = (name) => {
     let errors = {};
     if (name.length < 1) {
         errors.charname = "Name is too short";
         setErrors("144")
     }

     else if (name.length > 20) {
         errors.charname = "Name is too long";
         setErrors("2444")
     }

     else{
         setErrors('')
     }
 }


     const handleSubmit = (event) => {
         event.preventDefault();
         setSubmitting(true);
     };

     const finishSubmit =() => {
         console.log(name);
     };
     useEffect(() => {

         if(errors && errors.length === 0 && submitting){
             finishSubmit();

         }
     }, [errors]);



console.log("errors",errors)
    console.log("gamearr",classes)

    // const game =
    //     {
    //         "id": 0,
    //         "creatorId": 0,
    //         "name": "string",
    //         "description": "string",
    //         "baseLocationId": 0,
    //         "locations": [
    //             {
    //                 "id": 0,
    //                 "gameId": 0,
    //                 "name": "string",
    //                 "description": "string",
    //                 "mapFilePath": "string",
    //                 "width": 0,
    //                 "height": 0,
    //                 "basePlayersXPosition": 0,
    //                 "basePlayersYPosition": 0
    //             }
    //         ],
    //         "classes": [
    //             {
    //                 "id": 0,
    //                 "gameId": 0,
    //                 "name": "Бамбук",
    //                 "description": "БФмбук описание"
    //             },
    //             {
    //                 "id": 1,
    //                 "gameId": 0,
    //                 "name": "Диджей Ебан",
    //                 "description": "Ебан"
    //             }
    //             ,
    //             {
    //                 "id": 2,
    //                 "gameId": 0,
    //                 "name": "Диджей Кабан",
    //                 "description": "string"
    //             }
    //             ,
    //             {
    //                 "id": 3,
    //                 "gameId": 0,
    //                 "name": "Диджей Json",
    //                 "description": "string"
    //             }
    //         ],
    //         "quests": [
    //             {
    //                 "id": 0,
    //                 "gameId": 0,
    //                 "name": "string",
    //                 "description": "string",
    //                 "hiddenDescription": "string"
    //             }
    //         ],
    //         "items": [
    //             {
    //                 "id": 0,
    //                 "gameId": 0,
    //                 "name": "string",
    //                 "description": "string",
    //                 "itemType": "string"
    //             }
    //         ],
    //         "nonPlayableCharacters": [
    //             {
    //                 "id": 0,
    //                 "gameId": 0,
    //                 "name": "string",
    //                 "baseLocationId": 0,
    //                 "baseXPosition": 0,
    //                 "baseYPosition": 0,
    //                 "avatarFilePath": "string"
    //             }
    //         ],
    //         "skills": [
    //             {
    //                 "id": 0,
    //                 "gameId": 0,
    //                 "name": "Спел1",
    //                 "description": "string",
    //                 "availableOnlyForCharacterClassId": 0,
    //                 "availableOnlyForNonPlayableCharacterId": 0
    //             },
    //             {
    //                 "id": 0,
    //                 "gameId": 0,
    //                 "name": "Спел2",
    //                 "description": "string",
    //                 "availableOnlyForCharacterClassId": 0,
    //                 "availableOnlyForNonPlayableCharacterId": 0
    //             },
    //             {
    //                 "id": 1,
    //                 "gameId": 0,
    //                 "name": "string1",
    //                 "description": "string1",
    //                 "availableOnlyForCharacterClassId": 0,
    //                 "availableOnlyForNonPlayableCharacterId": 0
    //             },
    //             {
    //                 "id": 1,
    //                 "gameId": 0,
    //                 "name": "string1",
    //                 "description": "string1",
    //                 "availableOnlyForCharacterClassId": 0,
    //                 "availableOnlyForNonPlayableCharacterId": 0
    //             },
    //             {
    //                 "id": 1,
    //                 "gameId": 0,
    //                 "name": "string1",
    //                 "description": "string1",
    //                 "availableOnlyForCharacterClassId": 0,
    //                 "availableOnlyForNonPlayableCharacterId": 0
    //             }
    //         ]
    //     }
    const onChangeHandler = event => {
        validateValues(name);
        setName(event.target.value);
        console.log("aaaaaaEtoNado", name)

    };


    const player = async () => {
        const token = getCredentials()?.token;
        try {
            const response = await fetch(devConsts.api + '/players?' + new  URLSearchParams({SessionId: 6, CharacterClassId: 5, Name: name}), {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                },
            );
            if (response.ok) {
                const characterResp = await response.json()
            }
            // return toQueryResult(response.status);
        } catch (e) {

        }
    }




    return (
        <div className="character_field">

            <div className="character_field__logo_field">
                <img src={img} width={100} height={110} className="character_field__logo"/>
                <h1 className="character_field__logo__name">Roller Coaster</h1>
            </div>



            <div className="character_field__choose">
                <div className="Input_wrapper">
                    { errors && errors.length === 0 && submitting ?(
                        <span className="success">Successfully submitted</span>
                    ): null}
                    <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" variant="outlined" color="success" placeholder="NAME"
                           onChange={onChangeHandler}
                           value={name.charname}

                           InputProps={{disableUnderline: true}}
                           sx={{
                               width: "200px",
                               height: "57px",
                               fontSize: "50px",
                               borderRadius: "5px",
                               backgroundColor: "#849d5a",
                               marginBottom: "40px",
                           }}/>
                        {errors?(
                            <p className="error">The name must be longer than 1 character and shorter than 35 characters </p  >
                        ): null}
                <Button onClick={handleChangeButton} disabled={errors.length !== 0 || name.length === 0}
                        sx={{
                            backgroundColor: "darkolivegreen",
                            color: "red"
                        }}
                >Send</Button>
                    </form>
               </div>


                <div>
                    <FormControl sx={{m: 1, minWidth: 120, backgroundColor: "#849d5a"}} size="small">
                        <InputLabel id="demo-select-small-label">Class</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"

                            label="Class"
                            onChange={handleChange}
                        >

                            {/*{classes.classes.map((item, index) =>*/}
                            {/*    <MenuItem value={index}>*/}
                            {/*        <h1 className="Class_Selecter">*/}
                            {/*            {item.name}*/}
                            {/*        </h1>*/}
                            {/*    </MenuItem>*/}
                            {/*)}*/}

                        </Select>
                    </FormControl>
                </div>


                <div className="character_field__main__description">
                    {character ? character.description : ''}</div>

            </div>
            <div className="character_field__main">
                <div className="character_field__main__characteristics">
                    <FolderList game={game}/>;
                </div>
            </div>

        </div>

    )
}