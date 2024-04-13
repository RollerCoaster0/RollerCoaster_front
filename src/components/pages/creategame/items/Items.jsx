import React, {useRef, useState} from 'react';
import '../creategame.css'
import ItemCard from "./ItemCard";
import {IconButton} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Items = () => {
    const idCounter = useRef(0);
    const [item, setItem] = useState({name: 'ItemName', description: ''})
    const [items, setItems] = useState([]);

    const useItem = () => {
        const [name, setName] = useState(`Item${items.length + 1}`);
        const [description, setDescription] = useState('');
        items.push({name, setName, description, setDescription})
        setItems(structuredClone(items));
    }

    const addItem = () => {
        items.push({name: '', description: '', id: idCounter.current});
        setItems(structuredClone(items));
        idCounter.current++;
        console.log(items)
    }
    return (
        <div className='game-items-container'>
            {items.map(item =>
                <ItemCard id={item.id} name={item.name} description={item.description}/>
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