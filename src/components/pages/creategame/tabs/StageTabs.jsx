import React from 'react';
import '../creategame.css'
import {Breadcrumbs, Link, Typography} from "@mui/material";

const StageTabs = ({stages}) => {
    return (
        <Breadcrumbs className='stage-tabs'>
            {stages.map(stage => <span key={stage.name} className={stage.current.isCurrent ? 'stage-tab-active' : 'stage-tab'}
                                       onClick={() => setCurrentStage(stages, stage.name)}>{stage.name}</span>)}
        </Breadcrumbs>
    );
};

function setCurrentStage(stages, key) {
    for (const stage of stages) {
      stage.current.setIsCurrent(stage.name === key);
    }
}

export default StageTabs;