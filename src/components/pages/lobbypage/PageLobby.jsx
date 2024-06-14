import React, {useState, useEffect} from 'react';
import img from "./img/x.jpg"
import {useNavigate} from "react-router-dom";
import {devConsts} from "../../../util/util";
import {getCredentials, queryResult, storeCredentials} from "../../../contexts/UserContext";

const PageLobby = () => {
    const [gameTitle, setGameTitle] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    // const [users, setUsers] = useState([]);
    const [gameId, setGameId] = useState('');
    const navigate = useNavigate();
    const [game, setGames] = useState('')
    const id = 1






    const getId = async () => {
        const token = getCredentials()?.token;
        try {
            const response = await fetch(devConsts.api + '/sessions/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
            );
            if(response.ok){
                const session = await response.json()
                setGameId(session.id)

                const response1 = await fetch(devConsts.api + '/games/' + session.id, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );
                if(response1.ok){
                    const get_game = await response1.json()
                    setGames(get_game)
                }

            }
        }
        catch (e){

        }
    }
    useEffect(() => {
        getId()

    }, []);


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
            }}>{game.name}</h1>
            <img
                src={img} // Замените на настоящий URL изображения
                alt="Ошибка соединения позвоните на номер 8 950 715 54 47"
                style={{marginTop: '30px', marginBottom: '30px', borderRadius: '10px', width: '80%', height: 'auto',}}
            />
            <p style={{alignSelf: 'start',fontSize:'20px',marginLeft:'90px', fontFamily: 'Kelly Slab, serif',}}>ID игры: {gameId}</p>
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
                <h2 style={{textAlign: "center", fontFamily: 'Kelly Slab, serif',}}>Описание игры</h2>
                <p>
                    {game.description}
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
                <p>Скала</p>
                <p>Дима</p>
                <p>Гебс</p>
                <p>Федя</p>
                <p>Володя</p>
                <p>Коротков</p>


                <ul>
                    {/*{users.map(user => (*/}
                    {/*    <li key={user.id}>{user.name}</li>*/}
                    {/*))}*/}
                </ul>
            </div>
            <button
                onClick={() => navigate("/game/:sessionId")}
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