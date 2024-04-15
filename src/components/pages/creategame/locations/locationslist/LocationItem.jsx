import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import '../../creategame.css'
const LocationItem = ({location, setEditableLocation, setModalShown}) => {

    const handleClick = () => {
       setEditableLocation(location);
       setModalShown(true);
    }

    return (
        <>
            <ListItem className='locations-list__item' key={location.name} onClick={handleClick}>
                <ListItemIcon>
                    <img className='location-list__item__preview' src={ location.map != null ?  URL.createObjectURL(location.map) : null} alt='x'/>
                </ListItemIcon>
                <ListItemText className='location-list__item__name' primary={location.name}/>
            </ListItem>
        </>
    );
};

export default LocationItem;