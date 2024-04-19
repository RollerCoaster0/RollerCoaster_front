import React from 'react';
import NPCcard from "./NPCcard";
import {IconButton} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const NPCs = () => {
    const onAdd = () => {}

    return (
        <>
            <div className='npcs-container'>
                <NPCcard/>
                <NPCcard/>
                <NPCcard/>
                <NPCcard/>
                <NPCcard/>
                <div className='npcs__add-npc-wrapper'>
                    <IconButton className='add-element-button' onClick={onAdd}>
                        <AddCircleIcon sx={{fontSize: 60}}/>
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default NPCs;