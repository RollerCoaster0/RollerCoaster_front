import React, {useState} from 'react';
import '../creategame.css'
import {Button, Card, CardContent, CardHeader, Menu, MenuItem} from "@mui/material";


const ItemType ={
    ARMOR: 'Armor',
    WEAPON: 'Weapon',
    OTHER: 'Other'
};

const ItemCard = () => {
    const [anchorEl, setAnchorElement] = useState(null);
    const [itemType, setItemType] = useState(ItemType.ARMOR);
    const handleClick = (e) => {
        setAnchorElement(e.currentTarget);
    }
    let open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorElement(null);
    }

    const handlePick = (variant) => {
        setItemType(variant);
        handleClose();
    }

    return (
        <div className='game-items-container'>
            <Card className='game-item-card'>
                <CardHeader className='game-item-card__header' title='ItemName'/>
                <CardContent>
                    <div className='game-item-card__option-wrapper'>
                        <h2 className='game-item-card__option-name'>Type:</h2>
                        <Button className='game-item-card__option' variant='contained'
                                onClick={e => handleClick(e)}>{itemType}</Button>
                        <Menu
                            anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{style: {width: 140}}}>
                            <MenuItem className='game-item-card__option-name' onClick={() => handlePick(ItemType.ARMOR)}>Armor</MenuItem>
                            <MenuItem className='game-item-card__option-name' onClick={() => handlePick(ItemType.WEAPON)}>Weapon</MenuItem>
                            <MenuItem className='game-item-card__option-name' onClick={() => handlePick(ItemType.OTHER)}>Other</MenuItem>
                        </Menu>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ItemCard;