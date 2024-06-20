import React, {useState} from 'react';
import {Alert, Button} from "@mui/material";
import {createGame} from "../../../../api/createGame";
import {useNavigate} from "react-router-dom";
import AlertMessage from "../../../common/AlertMessage";
import CheckIcon from "@mui/icons-material/Check";

const CreateGame = ({gameInfo, quests, npcs, items, locations, skills, classes}) => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState()
    const [id, setId] = useState()
    const handleGameCreation = async () => {
        setErrorMessage('')
        const res = await createGame(items, npcs, quests, gameInfo, locations, skills, classes)
        console.log('RES' ,res)
        if (res.ok) {
            setId(res.message)
        } else {
           setErrorMessage('error')
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

            {errorMessage ? <Alert severity="error">Something went wrong. Try again!</Alert> : null}
            {id ? <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">Success! Your game ID: {id} </Alert> : null}
        </div>
    );
};

export default CreateGame;