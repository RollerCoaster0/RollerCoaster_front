import React from 'react';
import '../creategame.css'
import {Breadcrumbs,} from "@mui/material";

const StageTabs = ({stages, currentStageIndex, setCurrentStageIndex}) => {
    return (
        <Breadcrumbs className='stage-tabs'>
            {stages.map((stage, ind) => <span key={stage.name} className={currentStageIndex === ind ? 'stage-tab-active' : 'stage-tab'}
                                       onClick={() => setCurrentStageIndex(ind)}>{stage.name}</span>)}
        </Breadcrumbs>
    );
};

export default StageTabs;