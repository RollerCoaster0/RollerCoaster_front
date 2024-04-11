import React from 'react';
import {Box, IconButton, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NewGameElementModal = ({isOpened, onClose, setClose, children}) => {
    return (
            <Modal open={isOpened}
                   onClose={onClose}>
                <Box className='new-element-modal'>
                    <IconButton className='new-element-modal__close' onClick={setClose}>
                        <CloseIcon sx={{fontSize: 25}}/>
                    </IconButton>
                    {children}
                </Box>
            </Modal>
    );
};

export default NewGameElementModal;