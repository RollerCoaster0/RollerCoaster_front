import React from 'react';
import '../creategame.css'
import {Breadcrumbs, Link, Typography} from "@mui/material";
const StageTabs = () => {
    return (
        <Breadcrumbs className='stage-tabs'>
            <span className='stage-tab'>Локации</span>
            <span className='stage-tab'>Квесты</span>
            <span className='stage-tab'>NPC</span>
            <span className='stage-tab'>Предметы</span>
        </Breadcrumbs>
    );
};

export default StageTabs;