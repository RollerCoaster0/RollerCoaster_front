import React, {useContext, useRef} from 'react';
import '../gamespace.css'
import Character from "../characters/Character";
import {GameContext} from "../../GameContext";

const GameField = ({children}) => {
    const fieldRef = useRef(null);
    const {characters, ownedCharacters, fieldParams, pickedCharacter, waitingForMove, field, setField} = useContext(GameContext);
    // console.log(pickedCharacter)
    return (
        <div className="game-field"
             style={{
                 backgroundImage: `url(${fieldParams?.background})`,
                 width: fieldParams?.cellSize * fieldParams?.fieldSize[0],
                 height: fieldParams?.cellSize * fieldParams?.fieldSize[1]
             }}
             ref={fieldRef}
             onClick={(e) => handleClick(e, waitingForMove, pickedCharacter, ownedCharacters, field, setField)}>

            {characters?.map((character) => <Character {...character}/>)}
            {/*{ow}nedCharacters?.map((character) => <OwnedCharacter {...character}/>)}*/}
            {children}
        </div>
    );
};

function handleClick(e, waitingForMove, pickedCharacter, ownedCharacters, field, setField) {
    // console.log(waitingForMove, pickedCharacter)
    if (!waitingForMove.current || pickedCharacter == null ) return;
    const [xPos, yPos] = calcPositionByCoords(0, 0); //event coords
    field = structuredClone(field);
    field[xPos][yPos] = pickedCharacter;
    setField(field);
    console.log(field)
}

function calcPositionByCoords(x, y) {
    return [3, 3];
}

function move(pickedCharacter, pos, field) {
    out:
        for (let i = 0; i < field?.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === pickedCharacter) {
                    field[i][j] = 0;
                    break out;
                }
            }
            out2:
                for (let i = 0; i < field?.length; i++) {
                    for (let j = 0; j < field[i].length; j++) {
                        if (field[i][j] === pickedCharacter) {
                            field[i][j] = 0;
                            break out2;
                        }
                    }
                }
        }
export default GameField;