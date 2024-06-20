import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {Tooltip} from "@mui/material";

const Quests = () => {
    return (
        <>
            <Tooltip title='Quests'>
                <MenuBookIcon sx={iconStyle}/>
            </Tooltip>
        </>
    );
};

const iconStyle = {
    width: '55px',
    height: '60px',
    zIndex: 1000,
    transition: 'transform 0.2s ease',
    color: 'white',
    '&:hover': {
        transform: 'scale(1.3, 1.3)',
    }
}
export default Quests;