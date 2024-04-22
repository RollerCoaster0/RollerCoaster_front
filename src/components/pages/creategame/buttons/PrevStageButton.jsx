import React from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../creategame.css'
const PrevStageButton = ({currentStageIndex, setCurrentStageIndex}) => {
    return (
            <IconButton onClick={() => setCurrentStageIndex(Math.max(0,currentStageIndex - 1 ))} className='create-game-container__prev-button' sx={{
                position: 'fixed',
                top: '25%',
                left: '50px',
                height: '100px',
                aspectRatio: 1,
                borderRadius: '100%',
                backgroundColor: 'darkolivegreen',
                opacity: '60%',
                marginTop: '100px',
                marginBottom: '100px'
            }}>
                <ArrowBackIosIcon className='create-game-container__arrow-icon'/>
            </IconButton>
    );
};

export default PrevStageButton;