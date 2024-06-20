import React, {useContext, useLayoutEffect, useRef} from 'react';
import {GameContext} from "../../../contexts/GameContext";
import {gamePhaseType} from "../../pages/gamepage/GamePage";

const Npc = ({npc}) => {
    const {id, name, avatar, pos} = {...npc}
    const {cellSize, setGamePhase, isGm, pickedPlayerId,gamePhase,  setPickedEntity, setShownEntity} = useContext(GameContext)
    const position = calcPxPosition(cellSize, pos)
    const charRef = useRef()
    const handleClick = (e, npc) => {
        console.log('NPC', npc)
        console.log('PHASE', gamePhase)
        console.log(isGm)
        if (isGm) {
            console.log()
            setPickedEntity({type: 'npc', entity: npc })
            pickedPlayerId.current = id
            setGamePhase(gamePhaseType.MAKING_MOVE)
        } else {
            setPickedEntity(null)
            setGamePhase(gamePhaseType.WAITING_FOR_MOVE)
        }
        setShownEntity({type: 'nps', entity: npc})
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
             }} onClick={e => handleClick(e, npc)}>
            <img src={avatar} style={{width: cellSize * 0.8, height: cellSize * 0.8}}
                 alt={name}/>
        </div>
    );
};


function calcPxPosition(cellSize, pos) {
    return {x: pos.x * cellSize, y: pos.y * cellSize}
}
export default Npc;
