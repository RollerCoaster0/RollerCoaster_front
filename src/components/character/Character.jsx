import React from 'react';
import {TextField} from "@mui/material";
import img from "./logo/img.png";
import './character.css'
import Characteristics from "./Characteristics";
import Classes from "./Classes";
import CharacterText from "./CharacterText";
import FolderList from "./FolderList";


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

                {/*<TextField placeholder="description" label="Multiline"*/}
                {/*           multiline*/}
                {/*           maxRows={15}*/}
                {/*           scrollBar*/}

                {/*    sx={{*/}
                {/*        width: "300px",*/}
                {/*        height: "300px",*/}
                {/*        fontSize: "50px",*/}
                {/*        borderRadius: "5px",*/}
                {/*        backgroundColor: "#849d5a",*/}
                {/*        color:"#849d5a",*/}
                {/*        marginBottom: "40px",*/}
                {/*        left:"50px",*/}


                {/*    }}*/}
                {/*></TextField>*/}


                <div className="character_field__main__description">
                    <CharacterText/>
                </div>




            </div>
            <div className="character_field__main">
                <div className="character_field__main__characteristics">
                    <Characteristics/>
                </div>
            </div>
            <div className="character_field__main__describtion">
               <CharacterText/>

            </div>
        </div>

    );
};

export default Character;