import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    ClickAwayListener, Collapse,
    Menu, MenuItem,
    TextField
} from "@mui/material";
import {ItemType} from "./ItemCard";

const ItemCardEditMode = ({itemsList, setItemsList, name, description, id, editMode, setEditMode}) => {
    const [anchorEl, setAnchorElement] = useState(null);
    const [itemType, setItemType] = useState(ItemType.ARMOR);
    const [newItemName, setNewItemName] = useState(name);
    const [newItemDescription, setNewItemDescription] = useState(description);

    useEffect(() => {
        setEditMode(name === '');
    }, []);


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
    const onSave = (e) => {
        e.stopPropagation();
        setEditMode(false);
        setItemsList(itemsList.map(item => {
            if (item.id === id) {
                return {name: newItemName, description: newItemDescription, id: id};
            }
            return item;
        }));
    }

    const onDelete = () => {
        setItemsList(itemsList.filter(item => item.id !== id))
    }
    return (

                    <ClickAwayListener onClickAway={e => onSave(e)}>
                        <Card className='game-item-card' onClick={e => {setEditMode(true); e.stopPropagation()}}>

                            <CardHeader className='game-item-card__header' sx={{paddingTop: '15px', paddingBottom: '0px'}}
                                        title=
                                            {<TextField variant='standard' defaultValue={name} placeholder='Name'
                                                        onChange={e =>  setNewItemName(e.target.value)}
                                                        InputProps={{disableUnderline: true, style: {fontSize: 25}}}/>}/>
                            <CardContent>
                                <div className='game-item-card__option-wrapper'>
                                    <h2 className='game-item-card__option-name'>Type:</h2>
                                         <Button className='game-item-card__option' variant='contained'
                                                  onClick={e => handleTypeMenuClick(e)}>{itemType}</Button>

                                    <Menu anchorEl={anchorEl} open={open} onClose={handleTypeMenuClose}
                                          MenuListProps={{style: {width: 140}}}>
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
                                    <TextField defaultValue={description} sx={{marginTop: 1}} variant='outlined'
                                               multiline={true} minRows={3} maxRows={3}
                                               onChange={e => setNewItemDescription(e.target.value)}/>
                                </div>

                            </CardContent>
                            <Collapse in={editMode} unmountOnExit timeout='auto'>
                                <Button onClick={e => onSave(e)} color='success'>Save</Button>
                            </Collapse>
                        </Card>
                    </ClickAwayListener>
    );
};

export default ItemCardEditMode;