import React, {useState, useEffect} from 'react';

const PageLobby = () => {
    const [gameTitle, setGameTitle] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [gameId, setGameId] = useState('');

    // Функция для генерации случайного ID
    const generateId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    useEffect(() => {
        // Генерация случайного ID при загрузке компонента
        setGameId(generateId());

        // Загрузка данных игры из бекенда
        fetch('/api/game')
            .then(response => response.json())
            .then(data => {
                setGameTitle(data.title);
                setGameDescription(data.description);
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
            });

        // Загрузка списка пользователей из бекенда
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div style={{display:'flex',backgroundColor: 'white',borderRadius:'30px',flexDirection:'column',alignItems:"center", padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif'}}>
            <h1 style={{backgroundColor: 'darkolivegreen',fontFamily:'Kelly Slab, serif', padding: '10px', textAlign: 'center',width: '80%',}}>{gameTitle}</h1>
            <img
                src="https://example.com/map.jpg" // Замените на настоящий URL изображения
                alt="Хуета"
                style={{width: '100%', height: 'auto',}}
            />
            <p style={{alignSelf:'start',fontFamily:'Kelly Slab, serif',}}>ID игры: {gameId}</p>
            <div style={{padding: '10px',fontFamily:'Kelly Slab, serif',borderRadius:'30px', backgroundColor: 'white', marginTop: '10px',background:'grey'}}>
                <h2 style={{textAlign:"center",fontFamily:'Kelly Slab, serif',}}>Описание игры</h2>
                <p>{gameDescription}</p>
            </div>
            <div style={{padding: '10px',borderRadius:'30px', fontFamily:'Kelly Slab, serif',backgroundColor: 'darkolivegreen', marginTop: '10px',width: '80%',alignItems:'center',}}>
                <h2 style={{textAlign:"center",fontFamily:'Kelly Slab, serif',}}>В сети</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
            <button style={{
                display: 'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignSelf:'center',
                borderRadius:'30px',
                width: '20%',
                fontFamily:'Kelly Slab, serif',
                padding: '10px',
                backgroundColor: 'darkolivegreen',
                color: 'black',
                border: 'none',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize:'20px',

            }}>
                Играть
            </button>
        </div>
    );
};

export default PageLobby;