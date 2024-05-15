import React from 'react';
import {TextField} from "@mui/material";
import img from "./logo/img.png";
import './character.css'
import Characteristics from "./Characteristics";
import Classes from "./Classes";


const Character = () => {
    return (
        <div className="character_field">

            <div className="character_field__logo_field">
                <img src={img} width={100} height={110} className="character_field__logo"/>
                <h1 className="character_field__logo__name">Roller Coaster</h1>
            </div>

            <div className="character_field__choose">
                <TextField id="outlined-basic" variant="outlined" color="success" placeholder="NAME"
                           InputProps={{disableUnderline: true}}
                           sx={{
                               width: "200px",
                               height: "57px",
                               fontSize: "50px",
                               borderRadius: "5px",
                               backgroundColor: "#849d5a",
                               marginBottom: "40px",
                           }}/>
                <Classes></Classes>

                <TextField placeholder="description"
                    sx={{
                        width: "200px",
                        height: "57px",
                        fontSize: "50px",
                        borderRadius: "5px",
                        backgroundColor: "#849d5a",
                        marginBottom: "40px",
                        left:"150px",
                    }}
                ></TextField>
            </div>
            <div className="character_field__main">
                <div className="character_field__main__characteristics">
                    <Characteristics/>
                </div>
            </div>
            <div className="character_field__main__describtion">
            </div>
        </div>

    );
};

export default Character;