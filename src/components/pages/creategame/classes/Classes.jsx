import React from 'react';
import {IconButton} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import '../creategame.css'
import ClassCard from "./ClassCard";
const Classes = ({classTmpId, classes, setClasses}) => {
    const onAdd = () => {
        setClasses(classes => [...classes, {id: classTmpId.current++, name: '', description: ''}])
    }
    return (
        <div className='classes-container'>
            {classes.map(c => <ClassCard key={c.id} classes={classes} classTmpId={classTmpId} setClasses={setClasses} characterClass={c} /> )}
            <IconButton className='add-element-button' onClick={onAdd}>
                <AddCircleIcon sx={{fontSize: 60}}/>
            </IconButton>
        </div>
    );
};

export default Classes;