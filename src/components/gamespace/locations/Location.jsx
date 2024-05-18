import React, {useContext, useEffect, useRef} from 'react';
import '../gamespace.css'
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";
import Character from "../characters/Character";

const Location = ({location, locationCharacters}) => {
    const {cellSize, gamePhase,  players, setPlayers, pickedPlayer} = useContext(GameContext)
    const locRef = useRef()
    const handleClick = useRef(null)
    const pickedPlayerRef = useRef(null)
    const playersRef = useRef(null)
    //TODO: узнать, можно ли обойтись без костылей для замыкания  ^^^
    const onWaitingForMove = () => {
        //
    }

    const makeMove = (e) => {
        const [x, y] = getInnerCoords(locRef, e)
        const pos = calcGridPositionByCoords(x, y, cellSize)
        setPlayers(playersRef.current.map(c => c.id === pickedPlayerRef.current.id ? {...c, pos: {x: pos.xPos, y: pos.yPos}} : c))
    }

    useEffect(() => {
        switch (gamePhase) {
            case gamePhaseType.WAITING_FOR_MOVE:
                handleClick.current = onWaitingForMove
                break
            case gamePhaseType.MAKING_MOVE:
                handleClick.current = makeMove
                break
            default:
                handleClick.current = null
        }
    }, [gamePhase]);

    useEffect(() => {
        pickedPlayerRef.current = pickedPlayer
        playersRef.current = players
    }, [pickedPlayer, players]);

    return (
        <div className='game-field' style={{
            backgroundImage: `url(${location.background})`,
            width: cellSize * location.size[0],
            height: cellSize * location.size[1],
        }} ref={locRef} onClick={e => handleClick.current?.(e)}>
            {locationCharacters.map(c => <Character {...c}/>)}
        </div>
    );
};

function getInnerCoords(elRef, e) {
    return [
         e.clientX - elRef.current.getBoundingClientRect().left,
         e.clientY - elRef.current.getBoundingClientRect().top
    ]
}

function calcGridPositionByCoords(x, y, cellSize) {
    const xPos = Math.floor(x / cellSize);
    const yPos = Math.floor(y / cellSize);
    return {xPos, yPos};
}

export default Location;