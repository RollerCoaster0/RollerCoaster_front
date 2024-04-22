import React from 'react';
import {Button} from "@mui/material";
import {createGame} from "../../../../api/createGame";

const CreateGame = ({gameInfo, quests, npcs, items, locations}) => {
    console.log(gameInfo, quests, npcs, items, locations)
    const handleGameCreation = async () => {
        const res = await createGame(items, npcs, quests, gameInfo, locations);
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