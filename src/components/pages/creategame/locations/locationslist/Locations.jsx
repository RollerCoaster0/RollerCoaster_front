import React, {useState} from 'react';
import {IconButton, List,} from "@mui/material";
import '../../creategame.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocationForm from "./LocationForm";
import LocationItem from "./LocationItem";

const Locations = ({locations, setLocations, idCounter}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [editableLocation, setEditableLocation] = useState(null);
    const onAddLocation = () => {
        setEditableLocation({name: '', description: '', map: null,  id: -1});
        setModalOpened(true);
    }
    return (
        <div className='locations-container'>
            <List className='locations-list'>
                {locations.map(location =>
                    <LocationItem key={location.id} setLocations={setLocations}
                                  setEditableLocation={setEditableLocation}
                                  locations={location} setModalShown={setModalOpened} location={location}/>)}
            </List>
            <IconButton className='add-element-button' onClick={onAddLocation}>
                <AddCircleIcon sx={{fontSize: 60}}/>
            </IconButton>
            <LocationForm editableLocation={editableLocation} locations={locations} setOpened={setModalOpened}
                          opened={modalOpened} idCounter={idCounter} setlocations={setLocations} setEditableLocation={setEditableLocation}/>

        </div>
    );
};

export default Locations;