import React, {useState} from 'react';
import {IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import '../../creategame.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NewLocationModal from "../createlocationmodal/NewLocationModal";

const Locations = ({locations, setLocations}) => {
    const [newLocationToggled, setNewLocationToggled] = useState(false);
    console.log(newLocationToggled)
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
            <IconButton className='add-location-button' onClick={() => setNewLocationToggled(true)}>
                <AddCircleIcon sx={{fontSize: 60}}/>
            </IconButton>

            <NewLocationModal setClose={() => setNewLocationToggled(false)} isOpened={newLocationToggled} onClose={() => setNewLocationToggled(false)}/>
        </div>
    );
};

export default Locations;