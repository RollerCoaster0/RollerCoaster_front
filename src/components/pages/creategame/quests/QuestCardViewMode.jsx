import {
    Card,
    CardContent,
    CardHeader,
} from "@mui/material";
import './quests.css'

const QuestCardViewMode = ({quest, quests, setQuests, setEditMode}) => {
    const onClick = (e) => {
        e.stopPropagation();
        setEditMode(true);
    }
    return (
        <div className='quests__quest-card-wrapper' onClick={e => onClick(e)}>
            <Card sx={{borderRadius: '10px'}}>
                <CardHeader title={<h2 className='quests__quest-card__header'>{quest?.name}</h2>}/>
                <CardContent>
                    <h2 className='quests__quest-card__param-name'>Description:</h2>
                    <p style={{height: 171, marginTop: 10}}>{quest?.description}</p>

                    <h2 className='quests__quest-card__param-name'>Hidden Description</h2>
                    <p style={{height: 171, marginTop: 10}}>{quest?.description}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuestCardViewMode;