import React, {useContext, useLayoutEffect, useRef,} from 'react';
import '../gamespace.css'
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";

const Character = ({id, name, avatar, pos, attributes}) => {
    const {cellSize, setGamePhase} = useContext(GameContext)
    const position = calcPxPosition(cellSize, pos)
    const charRef = useRef()

    const handleClick = (e) => {
        setGamePhase(gamePhaseType.MAKING_MOVE)
        e.stopPropagation()
    }

    useLayoutEffect(() => {
        charRef.current.style.transition = 'transform 0.5s ease'
        // setTransition('transform 0.5s ease')
    }, [pos]);

    useLayoutEffect(() => {
        charRef.current.style.transition = 'transform 0.0s ease'
        // setTransition( 'transform 0.0s ease')
    }, [cellSize]);
    //TODO: добавить обработку клика в зависимости от состояния игры
    return (
        <div ref={charRef} className="character"
             style={{
                 transform: `translate(${position.x}px, ${position.y}px)`,
                 width: cellSize,
                 height: cellSize,
                 padding: cellSize * 0.1
             }} onClick={e => handleClick(e)}>
            <img src={avatar} style={{width: cellSize * 0.8, height: cellSize * 0.8}}
                 alt={name}/>
        </div>
    );
};


function calcPxPosition(cellSize, pos) {
    return {x: pos.x * cellSize, y: pos.y * cellSize}
}

export default Character;