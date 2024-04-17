import React from 'react';
import './NPCs.css'
import {TextField} from "@mui/material";

const NpCcardInfo = ({name, locationName, editMode}) => {
    return (
        <>
            <div className='npcs__npc-card__npc-info'>
                {!editMode
                    ? <>
                            <h2 className='npcs__npc-card__npc-info__name'>The Rock</h2>
                            <h3 className='npcs__npc-card__npc-info__location'>Локация: Дагестан</h3>
                        </>
                    : <>
                        <TextField placeholder='Имя' inputProps={{disableUnderline: true,}} sx={{borderColor: 'white', backgroundColor: 'white', borderRadius: '10px', zIndex: 100, fontSize: 40}}/>
                        <TextField variant='outlined' placeholder='Локация' sx={{ marginTop: '10px', backgroundColor: 'white', borderRadius: '10px', zIndex: 100, fontSize: 25}}/>
                    </>}
            </div>
        </>
    );

};

export default NpCcardInfo;