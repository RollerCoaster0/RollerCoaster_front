import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import '../creategame.css'
import locationMap from '../../../../devassets/location_map.jpg'
import AddLocationButton from "./AddLocationButton";

const Locations = () => {
    return (
        <>
            <div className='locations-container'>
                <List className='locations-list'>
                    <ListItem className='locations-list__item'>
                        <ListItemIcon>
                            <img className='location-list__item__preview' src={locationMap} alt='x'/>
                        </ListItemIcon>
                        <ListItemText className='location-list__item__name' primary='Location 1'/>
                    </ListItem>
                    <ListItem className='locations-list__item'>
                        <ListItemIcon>
                            <img className='location-list__item__preview' src={locationMap} alt='x'/>
                        </ListItemIcon>
                        <ListItemText  className='location-list__item__name'primary='Location 2'/>
                    </ListItem>
                    <ListItem className='locations-list__item'>
                        <ListItemIcon>
                            <img className='location-list__item__preview' src={locationMap} alt='x'/>
                        </ListItemIcon>
                        <ListItemText  className='location-list__item__name' primary='Location 3'/>
                    </ListItem>
                </List>
                <AddLocationButton/>
            </div>
        </>
    );
};

export default Locations;