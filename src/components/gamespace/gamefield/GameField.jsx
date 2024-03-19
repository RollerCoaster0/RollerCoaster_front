import React, {useRef} from 'react';
import '../gamespace.css'
import {useFetchGameFieldData} from "../../../api/game/fetchGameFieldData";
import {devConsts} from "../../../util/util";
import Character from "../characters/Character";

const GameField = ({children}) => {
    const fieldRef = useRef(null);
    const data = useFetchGameFieldData();
    const fieldWidth = devConsts.defaultCellSize * data?.size[0];
    const fieldHeigth = devConsts.defaultCellSize * data?.size[1];
    const fieldContext = {
        fieldWidth,
        fieldHeigth,
        cellSize: devConsts.defaultCellSize
    }
    return (
        <div className="game-field"
             style={{backgroundImage: `url(${data?.background})`, width: fieldWidth, height: fieldHeigth}}
             ref={fieldRef}>
            {data?.characters.map((character) => <Character gameFieldContext={fieldContext} position={character.position}
                                                           attributes={character.attributes} avatar={character.avatar}/>)}
        </div>
    );
};

export default GameField;