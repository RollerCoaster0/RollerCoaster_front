import React, {useContext, useRef} from 'react';
import '../gamespace.css'
import Character from "../characters/Character";
import {GameContext} from "../../../contexts/GameContext";

const GameField = ({children}) => {
    const fieldRef = useRef(null);
    const {
        characters,
        ownedCharacters,
        fieldParams,
        pickedCharacter,
        waitingForMove,
        field,
        setField
    } = useContext(GameContext);

    return (
        <div className="game-field"
             style={{
                 backgroundImage: `url(${fieldParams?.background})`,
                 width: fieldParams?.cellSize * fieldParams?.fieldSize[0],
                 height: fieldParams?.cellSize * fieldParams?.fieldSize[1]
             }}
             ref={fieldRef}
             onClick={(e) => handleClick(e, waitingForMove, pickedCharacter, ownedCharacters, field, setField, fieldRef, fieldParams.cellSize)}>

            {characters?.map((character) => <Character {...character}/>)}
            {/*ownedCharacters?.map((character) => <OwnedCharacter {...character}/>)}*/}
            {children}
        </div>
    );
};

function handleClick(e, waitingForMove, pickedCharacter, ownedCharacters, field, setField, fieldRef, cellSize) {
    // console.log(waitingForMove, pickedCharacter)
    if (!waitingForMove.current || pickedCharacter == null) return;
    const x = e.clientX - fieldRef.current.getBoundingClientRect().left;
    const y = e.clientY - fieldRef.current.getBoundingClientRect().top;
    const pos = calcPositionByCoords(x, y, cellSize); //event coords
    field = structuredClone(field);
    move(pickedCharacter, pos, field, waitingForMove);
    setField(field);
}

function calcPositionByCoords(x, y, cellSize) {
    const xPos = Math.floor(x / cellSize);
    const yPos = Math.floor(y / cellSize);
    return [xPos, yPos];
}

function move(pickedCharacter, pos, field, waitingForMove) {
    out:
        for (let i = 0; i < field?.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === pickedCharacter) {
                    field[i][j] = 0;
                    break out;
                }
            }
        }
    const [x, y] = pos;
    field[y][x] = pickedCharacter;
    waitingForMove.current  = false;
    console.log(field, pickedCharacter)
}

export default GameField;