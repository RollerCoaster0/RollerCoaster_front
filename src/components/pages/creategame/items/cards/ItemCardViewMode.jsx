import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Collapse, Menu,
    TextField
} from "@mui/material";

const ItemCardViewMode = ({itemsList, setItemsList, name, description, id, editMode, setEditMode, itemType, setItemType}) => {
    const [anchorEl, setAnchorElement] = useState(null);
    const [newItemName, setNewItemName] = useState(name);
    const [newItemDescription, setNewItemDescription] = useState(description);


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
        <Card className='game-item-card' onClick={e => {
            e.stopPropagation()
        }}>
            <div className='game-item-card__forward-wrapper' onClick={() => setEditMode(true)}/>
            <CardHeader className='game-item-card__header' sx={{paddingTop: '15px', paddingBottom: '0px'}}
                        title=
                            {<TextField variant='standard' defaultValue={name} placeholder='Name'
                                        onChange={e => setNewItemName(e.target.value)}
                                        InputProps={{disableUnderline: true, style: {fontSize: 25}}}/>}/>
            <CardContent>
                <div className='game-item-card__option-wrapper'>
                    <h2 className='game-item-card__option-name'>Type:</h2>
                    <h2 className='game-item-card__option-name'>{itemType}</h2>
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

    );
};

export default ItemCardViewMode;