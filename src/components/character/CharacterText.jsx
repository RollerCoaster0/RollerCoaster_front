import React, {useEffect, useState} from 'react';
import {devConsts} from "../../util/util";
import {getCredentials} from "../../contexts/UserContext";

const CharacterText = () => {

    const [text, setText] = useState('');

    const [Class, setClass] = useState()

    useEffect(() => {

        async function initClasses() {
            let id_games = 0
            const token = getCredentials()?.token;
            let response = await fetch(devConsts.api + '/games?' + new URLSearchParams(id_games), {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${token}`,
                }
            })
            let data = response.json()
            setClass(data)
        }
        initClasses()
    }, []);


    return (
        <div>
            <h1>{Class.description}</h1>
        </div>
    );
}
export default CharacterText;