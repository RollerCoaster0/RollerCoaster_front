import React, {cloneElement, useState} from 'react';
import '../creategame.css'
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Menu,
    MenuItem,
    TextField
} from "@mui/material";


const ItemType = {
    ARMOR: 'Armor',
    WEAPON: 'Weapon',
    OTHER: 'Other'
};

const ItemCard = ({itemsList, setItemsList, name, description, id}) => {
    const [anchorEl, setAnchorElement] = useState(null);
    const [itemType, setItemType] = useState(ItemType.ARMOR);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const [isEdited, setIsEdited] = useState(true);
    const handleTypeMenuClick = (e) => {
        setAnchorElement(e.currentTarget);
    }
    let open = Boolean(anchorEl);
    const handleTypeMenuClose = () => {
        setAnchorElement(null);
    }

    const handleTypeMenuPick = (type) => {
        setItemType(type);
        handleTypeMenuClose();
    }

    const onSave = () => {
        setItemsList(itemsList.map(item => {
            if (item.id === id) {
                return {name: newItemName, description: newItemDescription}
            }
            return item;
        }));
    }
    return (
        <Card className='game-item-card' onClick={() => setIsEdited(true)}>
            {!isEdited
                ? <div className='game-item-card__forward-wrapper' onClick={() =>setIsEdited(true)}/>
                : null }
            <CardHeader className='game-item-card__header' sx={{paddingTop: '15px', paddingBottom: '0px'}} title=
                {<TextField variant='standard' defaultValue={name} placeholder='Name' onChange={() => {
                }} InputProps={{disableUnderline: true, style: {fontSize: 25}}}/>}/>
            <CardContent>
                <div className='game-item-card__option-wrapper'>
                    <h2 className='game-item-card__option-name'>Type:</h2>
                    <Button className='game-item-card__option' variant='contained'
                            onClick={e => handleTypeMenuClick(e)}>{itemType}</Button>
                    <Menu
                        anchorEl={anchorEl} open={open} onClose={handleTypeMenuClose} MenuListProps={{style: {width: 140}}}>
                        <MenuItem className='game-item-card__option-name'
                                  onClick={() => handleTypeMenuPick(ItemType.ARMOR)}>Armor</MenuItem>
                        <MenuItem className='game-item-card__option-name'
                                  onClick={() => handleTypeMenuPick(ItemType.WEAPON)}>Weapon</MenuItem>
                        <MenuItem className='game-item-card__option-name'
                                  onClick={() => handleTypeMenuPick(ItemType.OTHER)}>Other</MenuItem>
                    </Menu>
                </div>
                <div className="game-item-card__item-description">
                    <h2 className='game-item-card__option-name'>Description:</h2>
                    <TextField sx={{marginTop: 1}} variant='outlined' multiline={true} minRows={3} maxRows={3}/>
                </div>
                {isEdited ?
                    <Button onClick={(e) => {setIsEdited(false); e.stopPropagation(); console.log(isEdited)}} color='success'>Save</Button>
                    : null}
            </CardContent>

        </Card>
    );
};

export default ItemCard;