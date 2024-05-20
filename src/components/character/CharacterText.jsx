import React, {useEffect, useState} from 'react';
import {devConsts} from "../../util/util";
import {getCredentials} from "../../contexts/UserContext";
import "./character.css"

const CharacterText = () => {

    const [text, setText] = useState('');
    const [Class, setClass] = useState();
    const [Game,setGame] = useState();

    useEffect(() => {
        async function initClasses() {
            let gameId = 1;
            const token_game = getCredentials()?.token;
            let game_response = await fetch(devConsts.api + '/games?' + String(gameId),{
                headers:{
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${token_game}`,
                }
            })

            let game_data = game_response.json();
            setGame(await game_data);


        }
        initClasses();
    }, []);

console.log(Game)

    return (
        <div>
            <h1 className = "description__text">{Game?.classes[0].description}</h1>
        </div>
    );
}
export default CharacterText;