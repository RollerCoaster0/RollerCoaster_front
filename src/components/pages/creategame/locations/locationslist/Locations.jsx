import React, {useState} from 'react';
import {Box, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import '../../creategame.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Modal} from "react-bootstrap";

const Locations = ({locations, setLocations}) => {
    const [newLocationToggled, setNewLocationToggled] = useState(false);
    console.log(newLocationToggled)
    return (
        <div className='locations-container'>
            <List className='locations-list'>
                {locations.map(location =>
                    <ListItem className='locations-list__item'>
                        <ListItemIcon>
                            <img className='location-list__item__preview' src={location.map} alt='x'/>
                        </ListItemIcon>
                        <ListItemText className='location-list__item__name' primary={location.name}/>
                    </ListItem>)}
            </List>
            <IconButton className='add-location-button' onClick={() => setNewLocationToggled(true)}>
                <AddCircleIcon sx={{fontSize: 60}}/>
            </IconButton>

            <Modal open={newLocationToggled}
                   onClose={() => setNewLocationToggled(false)}>
                {/*<Box className='new-location-modal'></Box>*/}
                <div style={{width: 500, height: 500, backgroundColor: 'black'}}></div>
            </Modal>
        </div>
    );
};

export default Locations;