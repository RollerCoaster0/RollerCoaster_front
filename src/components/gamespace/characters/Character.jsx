import React, {useContext} from 'react';
import '../gamespace.css'
import {GameContext} from "../../../contexts/GameContext";

const Character = ({id, avatar, pos, attributes}) => {
    const {cellSize, characters, setPickedCharacter, pickedCharacter} = useContext(GameContext)
    const position = calcPxPosition(cellSize, pos)
    const handleClick = (e) => {
        setPickedCharacter(characters.find(c => c.id === id))
        e.stopPropagation()
        // console.log(pickedCharacter)
    }

    // console.log(pickedCharacter)
    //TODO: добавить обработку клика в зависимости от состояния игры
    return (
        <div className="character"
             style={{
                 transform: `translate(${position.x}px, ${position.y}px)`,
                 width: cellSize,
                 height: cellSize,
                 padding: cellSize * 0.1
             }} onClick={e => handleClick(e)}>
            <img src={avatar} style={{width: cellSize * 0.8, height: cellSize * 0.8}}
                 alt={'aboba'}/>
        </div>
    );
};


function calcPxPosition(cellSize, pos) {
    return {x: pos.x * cellSize, y: pos.y * cellSize}
}

export default Character;