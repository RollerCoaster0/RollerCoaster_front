import React from 'react';
import '../creategame.css'
import {Breadcrumbs, Link, Typography} from "@mui/material";
const StageTabs = () => {
    return (
        <Breadcrumbs className='stage-tabs'>
            <span className='stage-tab'>Locations</span>
            <span className='stage-tab'>Quests</span>
            <span className='stage-tab'>NPCs</span>
            <span className='stage-tab'>Items</span>
        </Breadcrumbs>
    );
};

export default StageTabs;