import React, {useState} from 'react';
import {Alert, Button, Paper, TextField} from "@mui/material";
import {createSession} from "../../../api/game";
import {useNavigate} from "react-router-dom";
import AlertMessage from "../../common/AlertMessage";
import CheckIcon from "@mui/icons-material/Check";

const CreateSession = () => {
    const [newSession, setNewSession] = useState({name: '', id: null, description: ''})
    const [errorMessage, setErrorMessage] = useState()
    const [showSuccess, setShowSuccess] = useState(false)
    const navigate = useNavigate()
    const [sId, setSId] = useState()
    console.log((sId))
    const onSubmit = async (session) => {
        setErrorMessage(null)
        if (session.name && session.description && session.id) {
            const response = await createSession(session)
            console.log(session, response)
            if (!response.ok) {
                setErrorMessage('Something went wrong')
                return
            }
            setShowSuccess(true)
            const data = await response.json()
            setSId(data.id)
        }
    }
    return (
        <>
            <Paper sx={backStyle}>
                <div style={titleStyle}>
                    Создание сессии
                </div>
                <div style={nameStyle}>Name:
                    <input style={{backgroundColor: 'transparent', fontSize: 20, width: 100}} value={newSession?.name}
                           onChange={e => setNewSession(s => {
                               return {...s, name: e.target.value}
                           })}/>
                </div>
                <div style={descStyle}>
                    Description:
                    <TextField multiline={true} rows={7} InputProps={{disableUnderline: true, style: {fontSize: 25}}}
                               variant={'standard'} defaultValue={newSession?.description}
                               onChange={e => setNewSession(s => {
                                   return {...s, description: e.target.value}
                               })}/>
                </div>
                <div style={idStyle}>ID игры:
                    <input style={{backgroundColor: 'transparent', fontSize: 20, width: 90}} value={newSession?.id}
                           onChange={e => setNewSession(s => {
                               return {...s, id: e.target.value}
                           })}/>
                </div>
                {showSuccess ? <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">Success! Your
                    ID: {sId}</Alert> : null}
                {errorMessage ? <Alert severity="error">Something went wrong. Try again!</Alert> : null}
            </Paper>
            {!Boolean(sId) ?
                <Button onClick={() => onSubmit(newSession)} sx={butStyle}>Создать</Button>
                : null}
        </>

    );
};

const butStyle = {
    width: '220px',
    height: '50px',
    backgroundColor: 'darkolivegreen',
    borderRadius: 30,
    color: 'white',
    margin: '40px auto',
    display: 'block',
    '&:hover': {
        backgroundColor: 'darkolivegreen',
        color: 'white'
    },
}


const descStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'space-between',
    backgroundColor: '#C5CCB8',
    padding: 10,
    width: 300,
    height: 300,
    borderRadius: 15,
    fontSize: 25

}


const backStyle = {
    width: '600px',
    height: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    justifyContent: 'space-around',
    alignItems: 'left',
    margin: '50px auto',
    padding: '3%'
}

const titleStyle = {
    backgroundColor: 'darkolivegreen',
    fontSize: 30,
    borderRadius: 15,
    width: 300,
    alignSelf: 'center',
    textAlign: 'center',
}

const idStyle = {
    backgroundColor: '#C5CCB8',
    borderRadius: 15,
    fontSize: 25,
    width: 220,
    height: 40,
    textAlign: 'left',
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 6
}

const nameStyle = {
    backgroundColor: '#C5CCB8',
    borderRadius: 15,
    fontSize: 25,
    width: 200,
    height: 40,
    textAlign: 'left',
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 6
}

export default CreateSession;