import React from 'react';
import {TextField} from "@mui/material";
import img from "./logo/img.png";

const Character = () => {
    return (
        <div className="character_field">

            <div className="character_field__logo_field">
                <img src={img} width={110} height={125} className="character_field__logo"/>
                <h1 className="character_field__logo__name">Roller Coaster</h1>
            </div>

            <TextField id="outlined-basic" variant="standard" InputProps={{disableUnderline: true}}
                       sx={{
                           width: "200px",
                           height: "40px",
                           alignItems: "center",
                           alignSelf: "center",
                           backgroundColor: "darkolivegreen",
                           padding: "15px",
                           borderRadius: "10px",
                       }}/>
        </div>
    );
};

export default Character;