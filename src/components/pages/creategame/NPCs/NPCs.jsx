import React from 'react';
import NPCcard from "./NPCcard";
import {IconButton} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const NPCs = ({NPCs, idCounter, setNPCs, locations}) => {
    const onAdd = () => {
        NPCs.push({name: '', location: null, avatar: null, id: idCounter.current++});
        setNPCs(structuredClone(NPCs));
    }

    return (
        <>
            <div className='npcs-container'>
                {NPCs?.map(npc => <NPCcard NPC={npc} NPCs={NPCs} setNPCs={setNPCs} locations={locations}/>)}
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