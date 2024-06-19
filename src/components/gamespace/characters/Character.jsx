import React, {useContext, useLayoutEffect, useRef,} from 'react';
import '../gamespace.css'
import {GameContext,} from "../../../contexts/GameContext";
import {gamePhaseType} from "../../pages/gamepage/GamePage";

const Character = ({player}) => {
    const {id, name, avatar, pos} = {...player}
    const {cellSize, setGamePhase, isGm, pickedPlayerId, currentPlayerId, pickedEntity,  setPickedEntity, setShownEntity} = useContext(GameContext)
    const position = calcPxPosition(cellSize, pos)
    const charRef = useRef()
    const handleClick = (e) => {
        if (isGm || currentPlayerId.current === id) {
            setPickedEntity({type: 'player', entity: player })
            pickedPlayerId.current = id
            setGamePhase(gamePhaseType.MAKING_MOVE)
        }
        setShownEntity({type: 'player', entity: player})
        e.stopPropagation()
    }

    useLayoutEffect(() => {
        charRef.current.style.transition = 'transform 0.5s ease'
    }, [pos]);

    useLayoutEffect(() => {
        charRef.current.style.transition = 'transform 0.0s ease'
    }, [cellSize]);
    //TODO: добавить обработку клика в зависимости от состояния игры
    return (
        <div ref={charRef} className="character"
             style={{
                 transform: `translate(${position.x}px, ${position.y}px)`,
                 width: cellSize,
                 height: cellSize,
                 padding: cellSize * 0.1
             }} onClick={handleClick}>
            <img src={avatar} style={{width: cellSize * 0.8, height: cellSize * 0.8}}
                 alt={name}/>
        </div>
    );
};


function calcPxPosition(cellSize, pos) {
    return {x: pos.x * cellSize, y: pos.y * cellSize}
}

export default Character;