import React from 'react';
import QuestCard from "./QuestCard";
import {ClickAwayListener, IconButton} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import '../creategame.css'
import './quests.css'

const Quests = ({quests, setQuests, idCounter}) => {
    const onAdd = () => {
        quests.push({name: '', description: '', id: idCounter.current++});
        setQuests(structuredClone(quests));
    }

    return (
        <div className='quests-container'>
            {quests.map(quest =>
                <QuestCard key={quest?.id} setQuests={setQuests} quest={quest} quests={quests}/>)}
            <div className='quests__add-quest-button-wrapper'>
                    <IconButton className='add-element-button' onClick={onAdd}>
                        <AddCircleIcon sx={{fontSize: 60}}/>
                    </IconButton>
            </div>
        </div>
    );
};

export default Quests;