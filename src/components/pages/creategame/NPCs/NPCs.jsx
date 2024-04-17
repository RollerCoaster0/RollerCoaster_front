import React from 'react';
import NPCcard from "./NPCcard";

const NPCs = () => {
    return (
        <div className='npcs-container'>
        <NPCcard/>
            <NPCcard/>
            <NPCcard/>
            <NPCcard/>
            <NPCcard/>
        </div>
    );
};

export default NPCs;