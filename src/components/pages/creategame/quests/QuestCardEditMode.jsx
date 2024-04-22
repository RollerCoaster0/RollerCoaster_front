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

const QuestCardEditMode = ({quest, quests, setQuests, editMode, setEditMode}) => {
    const [questName, setQuestName] = useState(quest?.name);
    const [questDescription, setQuestDescription] = useState(quest?.description);
    
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
        setQuests(quests.filter(q => q.id !== quest.id));
    }


    return (

            <Badge className='quest__badge'  badgeContent={ <IconButton onClick={onDelete}> <DeleteIcon  color='error'/></IconButton> }>
                <div className='quests__quest-card-wrapper'>
                    <Card  sx={{borderRadius: '10px'}}>
                        <CardHeader title={
                            <TextField onChange={e => setQuestName(e.target.value)} defaultValue={questName} variant='standard'
                                       placeholder='Name...' InputProps={{
                                disableUnderline: true,
                                style: {fontSize: 25}
                            }}/>}/>
                        <CardContent>
                            <h2 className='quests__quest-card__param-name'>Description:</h2>
                             <TextField className='quests__quest-card__description-input' multiline={true}
                                                   minRows={6}
                                                   maxRows={6}/>
                        </CardContent>
                        <Collapse  in={editMode} unmountOnExit={false} timeout='auto'>
                            <Button
                                onClick={e => onSave(e)}
                                style={{marginBottom: 10, marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                                variant='contained' color='success'>Save</Button>
                        </Collapse>
                    </Card>
                </div>
            </Badge>
    );
};

export default QuestCardEditMode;