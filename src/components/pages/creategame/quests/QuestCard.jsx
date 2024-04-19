import React, {useEffect, useState} from 'react';
import './quests.css'
import DeleteIcon from "@mui/icons-material/Delete";
import QuestCardEditMode from "./QuestCardEditMode";
import QuestCardViewMode from "./QuestCardViewMode";

const QuestCard = ({quest, quests, setQuests}) => {
    const [editMode, setEditMode] = useState();
    const [questName, setQuestName] = useState(quest?.name);
    const [questDescription, setQuestDescription] = useState(quest?.description);

    useEffect(() => {
        setEditMode(quest?.name == '');
    }, []);
    console.log(editMode)
    return (
        <>
            {editMode
            ? <QuestCardEditMode editMode={editMode} setEditMode={setEditMode} quest={quest} quests={quests}
                               setQuests={setQuests}/>
            : <QuestCardViewMode setEditMode={setEditMode} setQuests={setQuests} quests={quests} quest={quest}/>}
        </>

    );
};

export default QuestCard;