import React, {useState} from 'react';
import '../../creategame.css'
import {Box, Button, IconButton, Modal, TextField} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from "@mui/icons-material/Close";

const LocationForm = ({location, locations, setlocations, idCounter, opened, setOpened}) => {
    const [newLocationName, setNewLocationName] = useState(location?.name);
    const [newLocationDescription, setNewLocationDescription] = useState(location?.description);
    const [newLocationMap, setNewLocationMap] = useState(location?.map)

    const saveLocation = () => {
        if (location == null) {
            locations.push({name: newLocationName, description: newLocationDescription, id: idCounter++})
            setlocations(locations);
        } else {
            setlocations(locations.map(loc => {
                if (loc.id === location.id) {
                    return {name: newLocationName, description: newLocationDescription, id: loc.id};
                }
                return loc;
            }));
        }
        setOpened(false);
    }

    const onSave = () => {
        if (location == null) {

        }
    }


    return (
        <Modal open={opened}
               onClose={saveLocation}>
            <Box className='new-element-modal'>
                <IconButton className='new-element-modal__close' onClick={() => setOpened(false)}>
                    <CloseIcon sx={{fontSize: 25}}/>
                </IconButton>

                <div className='new-location-modal__form'>
                    <h3 className='new-location-modal__form__label'>Name:</h3>
                    <TextField inputProps={{style: {height: 15}}} variant='outlined' defaultValue={location?.name}
                               onChange={e => setNewLocationName(e.target.value)}/>
                    <h3 className='new-location-modal__form__label'>Description:</h3>
                    <TextField multiline={true} minRows={15} maxRows={15} variant='outlined'
                               defaultValue={location?.description}
                               onChange={e => setNewLocationDescription(e.target.value)}/>
                    <h3 className='new-location-modal__form__label'>Size:</h3>
                    <div className='new-location-modal__form__field-size'>
                        <TextField variant='outlined'/>
                        <span style={{fontSize: 15,}}>X</span>
                        <TextField variant='outlined'/>
                    </div>
                    <h3 className='new-location-modal__form__label'>Upload map:</h3>
                    <IconButton style={{height: 65, aspectRatio: 1}}>
                        <AttachFileIcon style={{fontSize: 50}}/>
                    </IconButton>
                    <Button color='success' variant='contained'
                            className='new-location-modal__form__save-button' onClick={saveLocation}>Save</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default LocationForm;