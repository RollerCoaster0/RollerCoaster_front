import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import img from "./logo/img.png";
import './character.css'
import FolderList from "./FolderList";
import {devConsts} from "../../util/util";
import {getCredentials} from "../../contexts/UserContext";
import {fetchGame, fetchSessionInfo} from "../../api/game";
import {useLoaderData} from "react-router-dom";

export default function Character() {
    const {sessionObj, gameObj} = useLoaderData()
    const [character, setCharacter] = useState({
        charname:"",
        }
    )
    const [name, setName] = useState('')



    const handleChange = (event) => {
        setCharacter(gameObj.classes[event.target.value]);

        console.log("aaaaaaEtoNenado", gameObj.classes[event.target.value])
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
    console.log("gamearr",gameObj)


    const onChangeHandler = event => {
        validateValues(name);
        setName(event.target.value);
        console.log("aaaaaaEtoNado", name)

    };


    const player = async () => {
        const token = getCredentials()?.token;
        try {
            const response = await fetch(devConsts.api + '/players?' + new  URLSearchParams({SessionId:sessionObj.id, CharacterClassId: character.id , Name: name}), {
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

                            {gameObj.classes.map((item, index) =>
                                <MenuItem value={index}>
                                    <h1 className="Class_Selecter">
                                        {item.name}

                                    </h1>
                                </MenuItem>
                            )}

                        </Select>
                    </FormControl>
                </div>


                <div className="character_field__main__description">
                    {character ? character.description : ''}</div>

            </div>
            <div className="character_field__main">
                <div className="character_field__main__characteristics">
                    <FolderList game={gameObj}/>
                </div>
            </div>

        </div>

    )
}