import React, {useEffect, useRef, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    TextField
} from "@mui/material";
import './quests.css'
import DeleteIcon from "@mui/icons-material/Delete";

const QuestCardEditMode = ({quest, quests, setQuests, editMode, setEditMode}) => {
    const [questName, setQuestName] = useState(quest?.name);
    const [questDescription, setQuestDescription] = useState(quest?.description);
    const [questHiddenDescription, setHiddenQuestDescription] = useState(quest?.description);
    const [errorShown, setErrorShown] = useState(false);
    const currentError = useRef('');
    const onSave = (e) => {
        e.stopPropagation();
        if (questName === '' || questDescription === '') {
            showError('Name and description can not be empty');
            return
        }
        console.log(questName, questDescription, questHiddenDescription);
        setQuests(quests.map(q => {
            if (q.id === quest.id) {
                return {name: questName, description: questDescription, id: q.id, hiddenDescription: questHiddenDescription}
            }
            return q;
        }));
        setEditMode(false);
    }
    const onDelete = () => {
        setQuests(quests.filter(q => q.id !== quest.id));
    }

    const showError = (message) => {
        currentError.current = message;
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 1000);
    }

    return (

        <Badge className='quest__badge'
               badgeContent={<IconButton onClick={onDelete}> <DeleteIcon color='error'/></IconButton>}>
            <div className='quests__quest-card-wrapper'>
                <Card sx={{borderRadius: '10px'}}>
                    <CardHeader title={
                        <TextField onChange={e => setQuestName(e.target.value)} defaultValue={questName}
                                   variant='standard'
                                   placeholder='Name...' InputProps={{
                            disableUnderline: true,
                            style: {fontSize: 25}
                        }}/>}/>
                    <CardContent>
                        <h2 className='quests__quest-card__param-name'>Description:</h2>
                        <TextField defaultValue={questDescription} onChange={e => setQuestDescription(e.target.value)}
                                   className='quests__quest-card__description-input' multiline={true}
                                   minRows={6}
                                   maxRows={6}/>

                        <h2 className='quests__quest-card__param-name'>Hidden Description:</h2>
                        <TextField defaultValue={questHiddenDescription} onChange={e => setHiddenQuestDescription(e.target.value)}
                                   className='quests__quest-card__description-input' multiline={true}
                                   minRows={6}
                                   maxRows={6}/>

                    </CardContent>
                    <Collapse in={editMode} unmountOnExit={false} timeout='auto'>
                        <p style={{
                            textAlign: 'center',
                            color: errorShown ? 'red' : 'transparent',
                            marginBottom: 10,
                            zIndex: 100,
                            fontSize: 20,
                        }}>{currentError.current}</p>
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