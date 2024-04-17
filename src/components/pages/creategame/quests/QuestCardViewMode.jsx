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

const QuestCardViewMode = ({quest, quests, setQuests, setEditMode}) => {
    const onClick = (e) => {
        e.stopPropagation();
        setEditMode(true);
    }
    return (
        <div className='quests__quest-card-wrapper' onClick={e => onClick(e)}>
            <Card>
                <CardHeader title={<h2 className='quests__quest-card__header'>{quest?.name}</h2>}/>
                <CardContent>
                    <h2 className='quests__quest-card__param-name'>Description:</h2>
                    <p style={{height: 171}}>{quest?.description}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuestCardViewMode;