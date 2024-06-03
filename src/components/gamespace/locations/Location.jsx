import React, {useContext, useEffect, useRef} from 'react';
import '../gamespace.css'
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";
import Character from "../characters/Character";
import {sendMove, tryAction} from "../../../api/game";

const Location = ({location}) => {
    const {cellSize, gamePhase,  players, setPlayers, currentPlayerId, setGamePhase} = useContext(GameContext)
    const locRef = useRef()
    const handleClick = useRef()
    const cellSizeRef  = useRef()
    const playersRef = useRef()
    const gamePhaseRef = useRef()
    //TODO: узнать, можно ли обойтись без костылей для замыкания  ^^^
    const onWaitingForMove = () => {
        //
    }

    const makeMove = (e) => {
        const [x, y] = getInnerCoords(locRef, e)
        const pos = calcGridPositionByCoords(x, y, cellSizeRef.current)
        setPlayers(players => players.map(c => c.id === currentPlayerId.current ? {...c, pos: {x: pos.xPos, y: pos.yPos}} : c))
        const newPlayers = playersRef.current.map(c => c.id === currentPlayerId.current ? {...c, pos: {x: pos.xPos, y: pos.yPos}} : c)
        const prevPlayers = playersRef.current
        let promise = sendMove(pos.xPos, pos.yPos, currentPlayerId.current)
        tryAction(promise, [prevPlayers, gamePhaseRef.current], [newPlayers, gamePhaseType.WAITING_FOR_MOVE], [setPlayers, setGamePhase] )
        setGamePhase(gamePhaseType.WAITING_FOR_MOVE)
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
        cellSizeRef.current = cellSize
        playersRef.current = players
        gamePhaseRef.current = gamePhase
    }, [cellSize, players, gamePhase]);

    return (
        <div className='game-field' style={{
            backgroundImage: `url(${location?.background})`,
            width: cellSize * location?.size[0],
            height: cellSize * location?.size[1],
        }} ref={locRef} onClick={e => handleClick.current?.(e)}>
            {players.map(c => <Character key={c.id} {...c}/>)}
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