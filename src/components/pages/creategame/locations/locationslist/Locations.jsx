import React, {useState} from 'react';
import {IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import '../../creategame.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NewGameElementModal from "../../NewGameElementModal";
import LocationForm from "./LocationForm";

const Locations = ({locations, setLocations}) => {
    const [newLocationToggled, setNewLocationToggled] = useState(false);
    return (
        <div className='locations-container'>
            <List className='locations-list'>
                {locations.map(location =>
                    <ListItem className='locations-list__item' key={location.name}>
                        <ListItemIcon>
                            <img className='location-list__item__preview' src={location.map} alt='x'/>
                        </ListItemIcon>
                        <ListItemText className='location-list__item__name' primary={location.name}/>
                    </ListItem>)}
            </List>
            <IconButton className='add-element-button' onClick={() => setNewLocationToggled(true)}>
                <AddCircleIcon sx={{fontSize: 60}}/>
            </IconButton>
            <NewGameElementModal setClose={() => setNewLocationToggled(false)} isOpened={newLocationToggled} onClose={() => setNewLocationToggled(false)}>
                <LocationForm locations={locations} />
            </NewGameElementModal>
        </div>
    );
};

export default Locations;