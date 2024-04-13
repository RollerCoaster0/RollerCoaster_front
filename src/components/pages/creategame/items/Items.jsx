import React, {useRef, useState} from 'react';
import '../creategame.css'
import ItemCard from "./ItemCard";
import {IconButton} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Items = ({items, setItems, idCounter}) => {
    const addItem = () => {
        items.push({name: '', description: '', id: idCounter.current++});
        setItems(structuredClone(items));
    }

    return (
        <div className='game-items-container'>
            {items.map(item =>
                <ItemCard itemsList={items} setItemsList={setItems} id={item.id} name={item.name} key={item.id} description={item.description}/>
            )}
            <div className='game-items-container__add-button-wrapper'>
                <IconButton className='add-element-button' onClick={addItem}>
                    <AddCircleIcon sx={{fontSize: 60}}/>
                </IconButton>
            </div>
        </div>
    );

};

export default Items;