import React from 'react';
import {Box, IconButton, Modal} from "@mui/material";
import '../../creategame.css'
import CloseIcon from '@mui/icons-material/Close';

const NewLocationModal = ({isOpened, onClose, setClose}) => {
    return (
        <>
            <Modal open={isOpened}
                   onClose={onClose}>
                <Box className='new-location-modal'>
                    <IconButton className='new-location-modal__close' onClick={setClose}>
                        <CloseIcon sx={{fontSize: 25}}/>
                    </IconButton>
                </Box>
            </Modal>
        </>
    );
};

export default NewLocationModal;