import React from 'react';
import {Button} from "@mui/material";
import {createGame} from "../../../../api/createGame";
import {useNavigate} from "react-router-dom";

const CreateGame = ({gameInfo, quests, npcs, items, locations, skills, classes}) => {
    const navigate = useNavigate()
    const handleGameCreation = async () => {
        const res = await createGame(items, npcs, quests, gameInfo, locations, skills, classes);
        if (res.ok) {
            navigate('/')
        } else {
            console.log('NOT CREATED SO BAD')
        }
        console.log(res);
    }
    return (
        <div>
            <Button onClick={handleGameCreation} sx={{
                display: 'block',
                marginTop: '200px',
                color: 'white',
                fontSize: '30px',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: 'darkolivegreen',
                width: '420px',
                height: '120px',
                borderRadius: '50px'
            }} varaint='contained'>
                Create
            </Button>

        </div>
    );
};

export default CreateGame;