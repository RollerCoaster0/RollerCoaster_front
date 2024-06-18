import React, {useState} from 'react';
import {Badge, Button, ClickAwayListener, Collapse, IconButton, Paper, TextField} from "@mui/material";
import '../creategame.css'
import DeleteIcon from "@mui/icons-material/Delete";

const ClassCardEditMode = ({classTmpId, classes, setClasses, characterClass, setEditMode, editMode}) => {
    const [name, setName] = useState(characterClass?.name)
    const [des, setDes] = useState(characterClass?.name)
    const onDelete = () => {
        setClasses(classes => classes.filter(c => c.id !== characterClass.id))
    }
    const [error, setError] = useState('')
    const onSave = (e) => {
        e.stopPropagation()
        console.log('NAME', name)
        console.log('DESCR', des)

        if (name === '' || des === '') {
            setError('Name and description can not be empty')
        } else {
            setError('')
            setClasses(classes => classes.map(c => c.id === characterClass.id ? {id: characterClass.id, name, description: des}: c))
            setEditMode(false)
        }
    }
    const onCancel = (name, des) => {
        if (name === '' || des === '') {
            onDelete()
        }
        setEditMode(false)
    }
    return (
        <ClickAwayListener onClickAway={() => onCancel(name, des)}>
            <Badge badgeContent={<IconButton onClick={onDelete}> <DeleteIcon color='error'/></IconButton>}>
                <Paper sx={cardStyle}>
                    <h2 className='class-card__name'>Name:</h2>
                    <TextField sx={tfStyle} variant='standard' value={name} onChange={e => setName(e.target.value)}
                               InputProps={{disableUnderline: true, style: {fontSize: 25}}}/>
                    <h2 className='class-card__name'>Description:</h2>
                    <TextField sx={tfStyle} variant='standard' value={des} onChange={e => setDes(e.target.value)}
                               InputProps={{disableUnderline: true, style: {fontSize: 25,}}}
                               multiline={true} minRows={6} maxRows={6}/>
                    {error ? <p style={{color: 'red', fontSize: 20}}>{error}</p> : null}
                    <Collapse in={editMode}>
                        <Button onClick={onSave} sx={saveButton}>Save</Button>
                    </Collapse>
                </Paper>
            </Badge>
        </ClickAwayListener>
    );
};


const saveButton = {
    width: '160px',
    height: '50px',
    backgroundColor: 'darkolivegreen',
    borderRadius: '30px',
    color: 'white',
    display: 'block',
    margin: '60px auto',
    textTransform: 'none',
    fontSize: '25px',
    fontFamily: "Kelly Slab, serif",
    '&:hover': {
        backgroundColor: 'darkolivegreen',
    },
}


const tfStyle = {
    marginTop: '10px',
    backgroundColor: '#79845A',
    borderRadius: '15px',
    marginBottom: '30px',
    fontSize: '25px',
    padding: '1%',
    maxWidth: '300px'
}

const cardStyle = {
    backgroundColor: 'black',
    width: 400,
    height: 700,
    paddingTop: '50px',
    paddingBottom: '50px',
    paddingLeft: '30px',
    paddingRight: '30px',
    borderRadius: '15px'
}
export default ClassCardEditMode;