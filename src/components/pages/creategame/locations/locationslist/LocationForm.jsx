import React, {useEffect, useState} from 'react';
import '../../creategame.css'
import {Box, Button, IconButton, Input, Modal, TextField} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const LocationForm = ({
                          editableLocation,
                          setEditableLocation,
                          locations,
                          setlocations,
                          idCounter,
                          opened,
                          setOpened
                      }) => {

    const saveLocation = () => {
        if (editableLocation.id < 0) {
            locations.push({
                name: editableLocation.name,
                description: editableLocation.description,
                map: editableLocation.map,
                id: idCounter.current++,
                isBase,
                width,
                height,
                basePlayerXPosition,
                basePlayerYPosition,
            });
            setlocations(structuredClone(locations));
        } else {
            setlocations(locations.map(location => {
                if (location.id === editableLocation.id) {
                    return {
                        name: editableLocation.name,
                        description: editableLocation.description,
                        map: editableLocation.map,
                        id: editableLocation.id,
                        isBase,
                        width,
                        height,
                        basePlayerXPosition,
                        basePlayerYPosition
                    }
                }
                return location;
            }));
        }
        setOpened(false);
    }

    const [isBase, setIsBase] = useState(editableLocation?.isBase)
    const handleChange = (e) =>{
        setIsBase(e.target.checked);
    }

    const handleMapUpload = (e) => {
        setEditableLocation({...editableLocation, map: e.target.files?.[0]});
    }

    const [width, setWidth] = useState(editableLocation?.width ?? 8)
    const [height, setHeight] = useState(editableLocation?.height ?? 8)
    const [basePlayerXPosition, setBasePlayerXPosition] = useState(editableLocation?.baseXPosition ?? 0)
    const [basePlayerYPosition, setBasePlayerYPosition] = useState(editableLocation?.baseYPosition ?? 0)
    console.log(locations)
    return (
        <Modal open={opened}
               onClose={() => setOpened(false)}
               sx={{
                   overflow: 'auto',
                   scrollbarWidth: 'thin',
                   scrollbarColor: 'darkolivegreen',

               }}
        >
            <Box className='new-element-modal'>
                <IconButton className='new-element-modal__close' onClick={() => setOpened(false)}>
                    <CloseIcon sx={{fontSize: 25}}/>
                </IconButton>

                <div className='new-location-modal__form'>
                    <h3 className='new-location-modal__form__label'>Name:</h3>
                    <TextField inputProps={{style: {height: 15}}} variant='outlined'
                               defaultValue={editableLocation?.name}
                               onChange={e => setEditableLocation({...editableLocation, name: e.target.value})}/>
                    <h3 className='new-location-modal__form__label'>Description:</h3>
                    <TextField multiline={true} minRows={15} maxRows={15} variant='outlined'
                               defaultValue={editableLocation?.description}
                               onChange={e => {
                                   setEditableLocation({...editableLocation, description: e.target.value});
                                   console.log(e.target.files)
                               }}/>

                    <h3 className='new-location-modal__form__label'>Size:</h3>
                    <div className='new-location-modal__form__field-size'>
                        <TextField value={width ?? ''} variant='outlined' placeholder='Width'
                                   onChange={e => setWidth(e.target.value)}/>
                        <span style={{fontSize: 15}}>X</span>
                        <TextField variant='outlined' value={height ?? ''} onChange={(e) => setHeight(e.target.value)}
                                   placeholder='Height'/>
                    </div>

                    <h3 className='new-location-modal__form__label'>Base player position:</h3>
                    <div className='new-location-modal__form__field-size'>
                        <TextField value={basePlayerXPosition ?? ''} variant='outlined' placeholder='X'
                                   onChange={e => setBasePlayerXPosition(e.target.value)}/>
                        <TextField variant='outlined' value={basePlayerYPosition ?? ''} onChange={(e) =>setBasePlayerYPosition(e.target.value)}
                                   placeholder='Y'/>
                    </div>

                    <h3 className='new-location-modal__form__label'>Base location:</h3>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label=""
                                      onChange={handleChange}/>

                    <h3 className='new-location-modal__form__label'>Upload map:</h3>
                    <div>
                        <Input type='file' inputProps={{accept: 'image/png, image/jpg, image/jpeg'}}
                               placeholder={`${editableLocation?.map?.name}`}
                               onChange={e => handleMapUpload(e)}/>
                        <AttachFileIcon style={{fontSize: 50}}/>

                    </div>

                    <Button color='success' variant='contained'
                            className='new-location-modal__form__save-button' onClick={saveLocation}>Save</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default LocationForm;