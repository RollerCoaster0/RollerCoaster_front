import React, {useContext, useRef} from 'react';
import '../gamespace.css'
import Character from "../characters/Character";
import {GameContext} from "../../GameContext";

const GameField = ({children}) => {
    const fieldRef = useRef(null);
    const {characters, ownedCharacters, fieldParams} = useContext(GameContext);
    return (
        <div className="game-field"
             style={{
                 backgroundImage: `url(${fieldParams?.background})`,
                 width: fieldParams?.cellSize * fieldParams?.fieldSize[0],
                 height: fieldParams?.cellSize * fieldParams?.fieldSize[1]
             }}
             ref={fieldRef}>
            {characters?.map((character) => <Character {...character}/>)}
            {/*{ownedCharacters?.map((character) => <OwnedCharacter {...character}/>)}*/}
            {children}
        </div>
    );
};

export default GameField;