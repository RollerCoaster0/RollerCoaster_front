import React from 'react';
import {Modal} from "react-bootstrap";
import {Box} from "@mui/material";
import '../../creategame.css'
const NewLocationModal = ({isOpened}) => {
    return (
       <>
           <Modal open={isOpened}>
            <Box className='new-location-modal'>

            </Box>
           </Modal>
       </>
    );
};

export default NewLocationModal;