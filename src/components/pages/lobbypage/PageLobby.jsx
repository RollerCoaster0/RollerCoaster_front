import React, {useState, useEffect, useContext, useRef} from 'react';
import img from "./img/x.jpg"
import {useLoaderData, useNavigate} from "react-router-dom";
import {UserContext} from "../../../contexts/UserContext";
import {GameContext} from "../../../contexts/GameContext";
import {gamePhaseType, userLocation} from "../gamepage/GamePage";
import NotGmOnly from "../../gamespace/NotGmOnly";
import GMonly from "../../gamespace/GMonly";
import {Button} from "@mui/material";
import {startSession} from "../../../api/game";

const PageLobby = ({setWhereIsUser}) => {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const {session, players, setGamePhase, gamePhase} = useContext(GameContext)
    const buttonHandler = useRef();
    useEffect(() => {
        let req = players?.find(p => p.userId === user.id)
        console.log('REQ', req)
        console.log('SESSION IS',session)
        if (!req && user.id !== session.gameMasterUserId) {
            setGamePhase(gamePhaseType.HAS_NOT_PLAYER)
        } else {
            if (!session.isActive) {
                setGamePhase(gamePhaseType.NOT_STARTED)
            } else {
                setGamePhase(gamePhaseType.WAITING_FOR_MOVE)
            }
        }
    }, [session]);

    const handleStart = async () => {
        const response = await startSession(session.id)
        if (!response.ok) {
            //TODO: handle
        }
    }
    console.log('GAMEPH', gamePhase)
    useEffect(() => {
        switch (gamePhase) {
            case gamePhaseType.HAS_NOT_PLAYER:
                buttonHandler.current = () => {
                    navigate(`/character/${session.id}`)
                }
                break
            case gamePhaseType.WAITING_FOR_MOVE:
                buttonHandler.current = () => {
                    setWhereIsUser(userLocation.GAME_FIELD)
                }
                break
            default:
                buttonHandler.current = () => {
                }
        }
    }, [gamePhase]);
    const handlePlayButton = () => {
        const currentPlayer = players.find(p => p.userId === user.id)
        if (currentPlayer) {
            navigate(`/game/${session?.id}`)
        } else {
            navigate(`/character/${session?.id}`)
        }
    }

    return (
        <div style={{
            marginTop: '40px',
            marginBottom: '40px',
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '30px',
            flexDirection: 'column',
            alignItems: "center",
            padding: '20px',
            maxWidth: '900px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                backgroundColor: 'darkolivegreen',
                fontFamily: 'Kelly Slab, serif',
                borderRadius: '15px',
                padding: '10px',
                textAlign: 'center',
                width: '80%',
            }}>{session.name}</h1>
            <img
                src={img} // Замените на настоящий URL изображения
                alt="Ошибка соединения позвоните на номер 8 950 715 54 47"
                style={{marginTop: '30px', marginBottom: '30px', borderRadius: '10px', width: '80%', height: 'auto',}}
            />
            <p style={{alignSelf: 'start', fontSize: '20px', marginLeft: '90px', fontFamily: 'Kelly Slab, serif',}}>ID
                сессии: {session.id}</p>
            <div style={{
                marginBottom: '30px',
                padding: '10px',
                fontFamily: 'Kelly Slab, serif',
                borderRadius: '15px',
                backgroundColor: '#D9D9D9',
                marginTop: '30px',
                background: '#D9D9D9',
                width: '80%',
            }}>
                <h2 style={{textAlign: "center", fontFamily: 'Kelly Slab, serif',}}>Описание сессии</h2>
                <p>
                    {session.description}
                </p>
            </div>
            {gamePhase !== gamePhaseType.HAS_NOT_PLAYER

                ?
                <>
                    <div style={{
                        marginTop: '30px',
                        padding: '10px',
                        borderRadius: '15px',
                        fontFamily: 'Kelly Slab, serif',
                        backgroundColor: 'darkolivegreen',
                        width: '80%',
                        alignItems: 'center',
                    }}>
                        <h2 style={{textAlign: "center", fontFamily: 'Kelly Slab, serif',}}>Пользователи</h2>

                    </div>
                    <div style={{
                        marginBottom: '30px',
                        padding: '10px',
                        borderRadius: '15px',
                        fontFamily: 'Kelly Slab, serif',
                        backgroundColor: '#D9D9D9',
                        marginTop: '30px',
                        width: '80%',
                        alignItems: 'center',
                    }}>
                        <ul>
                            {players?.map(p => <li key={p.id}>{p.name}</li>)}
                        </ul>

                    </div>
                </>
                : null}
            <NotGmOnly>
                <button
                    onClick={buttonHandler.current}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center', //почему не css...
                        alignSelf: 'center',
                        borderRadius: '30px',
                        width: '25%',
                        height: '85px',
                        fontFamily: 'Kelly Slab, serif',
                        padding: '10px',
                        backgroundColor: 'darkolivegreen',
                        color: 'black',
                        border: 'none',
                        marginTop: '10px',
                        cursor: 'pointer',
                        fontSize: '29px',

                    }}>
                    {gamePhase > gamePhaseType.NOT_STARTED ? 'Играть' : ''}
                    {gamePhase === gamePhaseType.NOT_STARTED ? 'Игра пока не началась' : ''}
                    {gamePhase === gamePhaseType.HAS_NOT_PLAYER ? 'Создать игрока' : ''}
                </button>
            </NotGmOnly>
            <GMonly>
                {gamePhase === gamePhaseType.NOT_STARTED ? <Button sx={butStyle} onClick={handleStart}>Начать игру</Button> :null}
                {gamePhase > gamePhaseType.NOT_STARTED ? <Button sx={butStyle} onClick={() => setWhereIsUser(userLocation.GAME_FIELD)}>Войти</Button> : null}
            </GMonly>
        </div>
    );
};

const butStyle = {

    display: 'flex',
        flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: '30px',
    width: '25%',
    height: '85px',
    fontFamily: 'Kelly Slab, serif',
    padding: '10px',
    backgroundColor: 'darkolivegreen',
    color: 'black',
    border: 'none',
    marginTop: '10px',
    cursor: 'pointer',
    fontSize: '29px',
}
export default PageLobby;