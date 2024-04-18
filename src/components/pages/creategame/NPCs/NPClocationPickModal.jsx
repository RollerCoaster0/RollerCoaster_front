import React from 'react';
import {Box, List, ListItem, ListItemIcon, ListItemText, Modal} from "@mui/material";
import '../creategame.css'

const NPClocationPickModal = ({location, setLocation, locations, open, setOpen}) => {
    const noElements = locations.length === 0;
    console.log(noElements)
    const handleLocationPick = (location) => {
        setLocation(location);
        setOpen(false);
    }
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className='npcs__npc-card__npc-location-pick-modal'>
                {!noElements
                    ? <List>
                        {locations.map(loc =>
                            <ListItem className='npcs__npc-card__npc-location-pick-modal__location-item' onClick={() => handleLocationPick(loc)}>
                                <ListItemIcon>
                                    <img className='npcs__npc-card__npc-location-pick-modal__location-item__location-preview'
                                         src={loc.map != null ? URL.createObjectURL(loc.map) : null} alt='x'/>
                                </ListItemIcon>
                                <ListItemText className='location-list__item__name' primary={loc.name}/>
                            </ListItem>
                        )}
                    </List>
                 : <span style={{fontSize: 25, color: "lightgrey", textAlign: "center"}}>No locations yet</span>}

            </Box>
        </Modal>
    );
};

export default NPClocationPickModal;