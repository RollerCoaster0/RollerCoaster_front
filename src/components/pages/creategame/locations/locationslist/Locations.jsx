import React, {useState} from 'react';
import {IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import '../../creategame.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocationForm from "./LocationForm";
import LocationItem from "./LocationItem";

const Locations = ({locations, setLocations, idCounter}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [editableLocation, setEditableLocation] = useState(null);
    return (
        <div className='locations-container'>
            <List className='locations-list'>
                {locations.map(location =>
                    <LocationItem setLocations={setLocations} setEditableLocation={setEditableLocation}
                                  locations={location} setModalShown={setModalOpened} location={location}/>)}
            </List>
            <IconButton className='add-element-button' onClick={() => { setModalOpened(true)
            }}>
                <AddCircleIcon sx={{fontSize: 60}}/>
            </IconButton>
            <LocationForm location={editableLocation} locations={locations} setOpened={setModalOpened}
                          opened={modalOpened} idCounter={idCounter} setlocations={setLocations}/>

        </div>
    );
};

export default Locations;