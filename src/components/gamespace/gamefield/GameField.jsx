import React, {useRef, useState} from 'react';
import '../gamespace.css'
import {useFetchGameFieldData} from "../../../api/game/fetchGameFieldData";
import {devConsts} from "../../../util/util";
import Character from "../characters/Character";
import OwnedCharacter from "../characters/OwnedCharacter";

const GameField = ({children}) => {
    const [waitingForMove, setWaitingForMove] = useState(false);

    const fieldRef = useRef(null);
    const data = useFetchGameFieldData();
    const fieldWidth = devConsts.defaultCellSize * data?.size[0];
    const fieldHeigth = devConsts.defaultCellSize * data?.size[1];
    const fieldContext = {
        fieldWidth,
        fieldHeigth,
        setWaitingForMove,
        cellSize: devConsts.defaultCellSize,
    }


    return (
        <div className="game-field"
             style={{backgroundImage: `url(${data?.background})`, width: fieldWidth, height: fieldHeigth}}
             ref={fieldRef}>
            {data?.characters.map((character) => <Character gameFieldContext={fieldContext} {...character}/>)}
            {data?.ownedCharacters.map((character) => <OwnedCharacter gameFieldContext={fieldContext} {...character}/>)}

        </div>
    );
};

export default GameField;