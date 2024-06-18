import React,  {useLayoutEffect, useState} from 'react';
import {Paper} from "@mui/material";
import '../creategame.css'
import ClassCardEditMode from "./ClassCardEditMode";

const ClassCard = ({classTmpId, classes, setClasses, characterClass}) => {
    const [editMode, setEditMode] = useState(true)
    console.log(classes)
    const handleClick = (e) => {
        e.stopPropagation()
        setEditMode(true)
    }
    useLayoutEffect(() => {
        setEditMode(characterClass?.name === '');
    }, []);
    return (
        <>
            {!editMode ?
                <Paper onClick={handleClick} sx={cardStyle}>{characterClass?.name}</Paper>
                : <ClassCardEditMode classes={classes} classTmpId={classTmpId} setClasses={setClasses}
                                   setEditMode={setEditMode}
                                   characterClass={characterClass} editMode={editMode}/>
            }

        </>
    );
};
const cardStyle = {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    width: "200px",
    height: "50px",
    borderRadius: '30px'
}

export default ClassCard;