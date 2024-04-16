import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    ClickAwayListener,
    Collapse,
    IconButton,
    TextField
} from "@mui/material";
import './quests.css'
import DeleteIcon from "@mui/icons-material/Delete";

const QuestCard = ({quest, quests, setQuests}) => {
    const [editMode, setEditMode] = useState(false);
    const [questName, setQuestName] = useState(quest?.name);
    const [questDescription, setQuestDescription] = useState(quest?.description);

    useEffect(() => {
        setEditMode(quest.name === '');
    }, []);

    const onSave = (e) => {
        e.stopPropagation();
        setQuests(quests.map(q => {
            if (q.id === quest.id) {
               return {name: questName, description: questDescription, id: q.id}
            }
            return q;
        }));
        setEditMode(false);
    }
    const onDelete = () => {

    }
    const onCancel = () => {
        setQuestName(quest?.name);
        setQuestDescription(quest?.description)
        setEditMode(false);
    }

    const onClick = (e) => {
        e.stopPropagation();
        setEditMode(true);
    }
    return (
        <ClickAwayListener onClickAway={onCancel}>
            <Badge badgeContent={editMode ? <IconButton> <DeleteIcon color='error'/></IconButton> : null}>
                <div className='quests__quest-card-wrapper' onClick={e => onClick(e)}>
                    <Card>
                        <CardHeader title={editMode ?
                            <TextField onChange={e => setQuestName(e.target.value)} defaultValue={questName} variant='standard'
                                       placeholder='Name...' InputProps={{
                                disableUnderline: true,
                                style: {fontSize: 25}
                            }}/> : <h2 className='quests__quest-card__header'>{questName}</h2>}/>
                        <CardContent>
                            <h2 className='quests__quest-card__param-name'>Description:</h2>
                            {editMode ? <TextField className='quests__quest-card__description-input' multiline={true}
                                                   minRows={6}
                                                   maxRows={6}/>
                                : <p style={{height: 171}}>{questDescription}</p>}
                        </CardContent>
                        <Collapse in={editMode} unmountOnExit={false} timeout='auto'>
                            <Button
                                onClick={e => onSave(e)}
                                style={{marginBottom: 10, marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                                variant='contained' color='success'>Save</Button>
                        </Collapse>
                    </Card>
                </div>
            </Badge>
        </ClickAwayListener>
    );
};

export default QuestCard;