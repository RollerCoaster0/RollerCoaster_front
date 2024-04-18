import React from 'react';
import './NPCs.css'
import {Button, TextField} from "@mui/material";

const NpCcardInfo = ({name, location, setName, setLocation, editMode, setOpenLocationPickModal}) => {
    console.log(name)
    return (
        <>
            <div className='npcs__npc-card__npc-info'>
                {!editMode
                    ? <>
                            <h2 className='npcs__npc-card__npc-info__name'>{name}</h2>
                            <h3 className='npcs__npc-card__npc-info__location'>Location: {location?.name}</h3>
                        </>
                    : <>
                        <TextField defaultValue={name} onChange={e => setName(e.target.value)} placeholder='Name' inputProps={{disableUnderline: true,}} sx={{borderColor: 'white', backgroundColor: 'white', borderRadius: '10px', zIndex: 100, fontSize: 40}}/>
                        <Button onClick={() => setOpenLocationPickModal(true)} variant='outlined' sx={{ marginTop: '10px', backgroundColor: 'white', borderRadius: '10px', zIndex: 100, fontSize: 15}}>{location?.name ?? 'Location'}</Button>
                    </>}
            </div>
        </>
    );

};

export default NpCcardInfo;