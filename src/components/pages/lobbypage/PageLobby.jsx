import React, {useState} from 'react';

const LobbyPage = () => {
    const [lobbyName, setLobbyName] = useState('');
    const [gameId, setGameId] = useState('');
    const [gameDescription, setGameDescription] = useState('');

    const handleLobbyNameChange = (event) => {
        setLobbyName(event.target.value);
    };

    const handleGameIdChange = (event) => {
        setGameId(event.target.value);
    };

    const handleGameDescriptionChange = (event) => {
        setGameDescription(event.target.value);
    };

    return (
        <div style={{textAlign: 'center'}}>//п
            <div style={{
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '10px',
                margin: '20px auto',
                width: '50%',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <input type="text" placeholder="Enter lobby name" value={lobbyName} onChange={handleLobbyNameChange}
                       style={{
                           width: '100%',
                           padding: '5px',
                           margin: '10px 0',
                           border: '1px solid #ccc',
                           borderRadius: '5px'
                       }}/>
                {/*<img src="lobby-image.png" alt="Lobby Image" style={{maxWidth: '100%', marginBottom: '10px'}}/>*/}
                <input type="text" placeholder="Enter game ID" value={gameId} onChange={handleGameIdChange} style={{
                    width: '100%',
                    padding: '5px',
                    margin: '10px 0',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}/>
                <textarea placeholder="Enter game description" value={gameDescription}
                          onChange={handleGameDescriptionChange} style={{
                    width: '100%',
                    padding: '5px',
                    margin: '10px 0',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    height: '100px'
                }}/>
            </div>
        </div>
    );
};

export default LobbyPage;