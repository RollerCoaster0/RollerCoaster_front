import React, {useLayoutEffect, useRef, useState} from 'react';
import {Badge, Button, ClickAwayListener, Collapse, IconButton, Menu, MenuItem, Paper, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Skill = ({skill, skills, setSkills, skillTmpId, classes, npcs}) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(skill.name)
    const [description, setDescription] = useState(skill.description)
    const [error, setError] = useState('')
    const [charClass, setCharClass] = useState(classes?.[0])
    const [npc, setNpc] = useState(npcs?.[0])
    const [openClassMenu, setOpenClassMenu] = useState(false)
    const [openNPCMenu, setOpenNPCMenu] = useState(false)
    const classFieldRef = useRef()
    const npcFieldRef = useRef()
    useLayoutEffect(() => {
        if (name == '' || description == '') {
            setEditMode(true)
        }
    }, []);
    const onSave = (e) => {
        e.stopPropagation()
        if (name === '' || description === '') {
            setError('Name and description can not be empty')
        } else {
            setError('')
            setSkills(skills => skills.map(s => s.id === skill.id ? {
                id: skill.id,
                name,
                description,
                chClass: charClass,
                npc:npc
            } : s))
            setEditMode(false)
        }
    }


    const onCancel = (name, description) => {
        console.log(skill, name, description)
        if (name === '' || description === '') {
            onDelete()
        }
        setEditMode(false)
    }

    const onDelete = () => {
        setSkills(skills => skills.filter(s => s.id !== skill.id))
    }

    const handleClick = (e) => {
        setEditMode(true)
        e.stopPropagation()
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => onCancel(name, description)}>
                <Badge badgeContent={editMode ?
                    <IconButton onClick={onDelete}> <DeleteIcon color='error'/></IconButton> : null}>
                    <Paper sx={cardStyle} onClick={handleClick}>
                        <TextField sx={tfStyle} defaultValue={name} variant='standard' placeholder='Name'
                                   InputProps={{disableUnderline: true, style: {fontSize: 25}}}
                                   onChange={e => setName(e.target.value)}/>
                        <TextField sx={tfStyle} variant='standard' defaultValue={description} placeholder='Description'
                                   InputProps={{disableUnderline: true, style: {fontSize: 25}}} multiline={true}
                                   minRows={6}
                                   maxRows={6}
                                   onChange={e => setDescription(e.target.value)}/>
                        <Button ref={classFieldRef} sx={tfStyle}
                                onClick={() => setOpenClassMenu(true)}>{charClass?.name ?? 'Class'}</Button>
                        <Button ref={npcFieldRef} sx={tfStyle}
                                 onClick={() => setOpenNPCMenu(true)}>{npc?.name ?? 'NPC'}</Button>
                        <Menu open={openClassMenu} anchorEl={classFieldRef.current} onClose={() => setOpenClassMenu(false)}>
                            {classes.length === 0 ? <MenuItem>No classes yet</MenuItem> :
                                classes?.map(c => <MenuItem onClick={() => setCharClass(c)}>{c?.name}</MenuItem>)
                            }
                        </Menu>
                        <Menu open={openNPCMenu} anchorEl={npcFieldRef.current} onClose={() => setOpenNPCMenu(false)}>
                            {npcs?.length === 0 ? <MenuItem>No NPCs yet</MenuItem> :
                                npcs?.map(n => <MenuItem  onClick={() => setNpc(n)}>{n?.name}</MenuItem>)
                            }
                        </Menu>
                        {error ? <p style={{color: 'red', fontSize: 25}}>{error}</p> : null}
                        <Collapse in={editMode}>
                            <Button onClick={onSave} sx={saveButton}>Save</Button>
                        </Collapse>
                    </Paper>
                </Badge>
            </ClickAwayListener>
        </>

    );
};


const saveButton = {
    width: '160px',
    height: '50px',
    backgroundColor: 'darkolivegreen',
    borderRadius: '30px',
    color: 'white',
    display: 'block',
    marginTop: '60px',
    marginBottom: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textTransform: 'none',
    fontSize: '25px',
    fontFamily: "Kelly Slab, serif",
    '&:hover': {
        backgroundColor: 'darkolivegreen',
    },
}
const tfStyle = {
    backgroundColor: '#79845A',
    borderRadius: '15px',
    marginBottom: '30px',
    fontSize: '25px',
    padding: '1%',
    maxWidth: '300px',
    color: 'white',
    display: 'block',
    marginTop: '40px',
    fontFamily: "Kelly Slab, serif",
    textAlign: 'center',
    width: '100%',
    '&:hover': {
        backgroundColor: '#79845A',
    },
}
const cardStyle = {
    backgroundColor: 'black',
    width: 400,
    paddingTop: '50px',
    paddingBottom: '50px',
    paddingLeft: '30px',
    paddingRight: '30px',
    borderRadius: '15px'
}
export default Skill;