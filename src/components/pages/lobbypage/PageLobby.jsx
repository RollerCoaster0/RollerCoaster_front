import React, {useState, useEffect, useContext} from 'react';
import img from "./img/x.jpg"
import {useLoaderData, useNavigate} from "react-router-dom";
import { UserContext} from "../../../contexts/UserContext";

const PageLobby = () => {
    const {session, players} = useLoaderData()
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
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
            <p style={{alignSelf: 'start',fontSize:'20px',marginLeft:'90px', fontFamily: 'Kelly Slab, serif',}}>ID сессии: {session.id}</p>
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
                    {players.map(p => <li>{p.name}</li>)}
                </ul>
            </div>
            <button
                onClick={handlePlayButton}
                style={{

                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: '30px',
                width: '25%',
                height:'75px',
                fontFamily: 'Kelly Slab, serif',
                padding: '10px',
                backgroundColor: 'darkolivegreen',
                color: 'black',
                border: 'none',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize: '40px',

            }}>
                Играть
            </button>

        </div>
    );
};

export default PageLobby;