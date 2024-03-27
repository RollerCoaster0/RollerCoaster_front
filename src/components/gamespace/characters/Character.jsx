import React, {useContext} from 'react';
import '../gamespace.css'
import {GameContext} from "../GameContext";

const Character = ({id, avatar, attributes}) => {
    const {field, fieldParams, setPickedCharacter} = useContext(GameContext);
    const position = getPosition(field, fieldParams, id);
    return (
        <div className="character"
             style={{
                 transform: `translate(${position.x}px, ${position.y}px)`,
                 width: fieldParams?.cellSize,
                 height: fieldParams?.cellSize,
                 padding: fieldParams?.cellSize * 0.1
             }} onClick={(e) => {setPickedCharacter(id); e.stopPropagation();}}>
            <img src={avatar} style={{width: fieldParams?.cellSize * 0.8, height: fieldParams?.cellSize * 0.8}}
                 alt={'aboba'}/>

        </div>
    );
};


function getPosition(field, fieldParams, id) {
    for (let i = 0; i < field?.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === id) {
                return {x: j * fieldParams?.cellSize, y: i * fieldParams?.cellSize}
            }
        }
    }
    return null;
}

export default Character;