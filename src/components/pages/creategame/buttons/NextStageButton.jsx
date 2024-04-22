import React from 'react';
import {IconButton} from "@mui/material";
import '../creategame.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const NextStageButton = ({currentStageIndex, setCurrentStageIndex, numOfStages}) => {
    return (
        <IconButton onClick={() => setCurrentStageIndex(Math.min(currentStageIndex + 1, numOfStages - 1))} sx={{
            position: 'fixed',
            top: '25%',
            right: '50px',
            height: '100px',
            aspectRatio: 1,
            borderRadius: '100%',
            backgroundColor: 'darkolivegreen',
            opacity: '60%',
            marginTop: '100px',
            marginBottom: '100px'
        }}>
            <ArrowForwardIosIcon className='create-game-container__arrow-icon'/>
        </IconButton>
    );
};

export default NextStageButton;