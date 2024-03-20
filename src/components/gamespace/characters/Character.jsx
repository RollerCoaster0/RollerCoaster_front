import React, {useContext} from 'react';
import '../gamespace.css'
import {GameContext} from "../../GameContext";

const Character = ({id, avatar, attributes}) => {
    const {field, fieldParams} = useContext(GameContext);
    const getPosition = () => {
        for (let i = 0; i < field?.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === id) {
                    return {x: j * fieldParams.cellSize, y: i * fieldParams.cellSize}
                }
            }
        }
    }
    const position = getPosition();
    return (
        <div className="character"
             style={{
                 left: position.x,
                 top: position.y,
                 width: fieldParams?.cellSize,
                 height: fieldParams?.cellSize,
                 padding: fieldParams?.cellSize * 0.1
             }}>
            <img src={avatar} style={{width: fieldParams?.cellSize * 0.8, height: fieldParams?.cellSize * 0.8}}
                 alt={'aboba'}/>

        </div>
    );
};

export default Character;