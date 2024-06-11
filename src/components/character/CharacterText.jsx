import React, {useEffect, useState} from 'react';
import {devConsts} from "../../util/util";
import {getCredentials} from "../../contexts/UserContext";
import "./character.css"

const CharacterText   = ({item}) => {

    const [Game, setGame] = useState();

    console.log("ITEM", item)
    return (
        <div>
            <h1 className="description__text">{item}</h1>

        </div>
    );
}
export default CharacterText;