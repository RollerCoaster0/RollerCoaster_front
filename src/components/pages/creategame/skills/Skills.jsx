import React from 'react';
import '../creategame.css'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {IconButton} from "@mui/material";
import Skill from "../Skill";
const Skills = ({skills, setSkills, skillTmpId, classes, npcs}) => {
    console.log(skills)
    const onAdd = () => {
        setSkills(skills => [...skills, {id: skillTmpId.current++, name: '', description: '', }])
    }
    return (
        <div className='classes-container'>
            {skills.map(s => <Skill key={s.id} skills={skills} setSkills={setSkills} skill={s} classes={classes} npcs={npcs}/>)}
            <IconButton className='add-element-button' onClick={onAdd}>
                <AddCircleIcon sx={{fontSize: 60}}/>
            </IconButton>
        </div>
    );
};

export default Skills;