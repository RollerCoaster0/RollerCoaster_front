import React, {useContext, useEffect, useRef} from 'react';
import '../gamespace.css'
import {GameContext} from "../../../contexts/GameContext";
import Character from "../characters/Character";
import {moveNPC, sendMove, tryAction} from "../../../api/game";
import {gamePhaseType} from "../../pages/gamepage/GamePage";
import NPC from "../characters/NPC";

const Location = ({location}) => {
    const {cellSize, gamePhase,  players, setPlayers,  setGamePhase, pickedPlayerId, pickedEntity, setPickedEntity, isGm, setNpcs, npcs, setShownEntity} = useContext(GameContext)
    const locRef = useRef()
    const handleClick = useRef()
    const cellSizeRef  = useRef()
    const playersRef = useRef()
    const gamePhaseRef = useRef()
    const pickedEntityRef = useRef();
    const npcsRef = useRef()
    //TODO: узнать, можно ли обойтись без костылей для замыкания  ^^^
    const onWaitingForMove = () => {
        setShownEntity(null)
    }

    const makeMove = (e) => {
        const [x, y] = getInnerCoords(locRef, e)
        const pos = calcGridPositionByCoords(x, y, cellSizeRef.current)
        console.log('curreeentt', pickedEntityRef.current)
        if (pickedEntityRef.current.type === 'player') {
            setPlayers(players => players.map(c => c.id === pickedPlayerId.current ? {...c, pos: {x: pos.xPos, y: pos.yPos}} : c))
            const newPlayers = playersRef.current.map(c => c.id === pickedPlayerId.current ? {...c, pos: {x: pos.xPos, y: pos.yPos}} : c)
            const prevPlayers = playersRef.current
            let promise = sendMove(pos.xPos, pos.yPos, pickedPlayerId.current)
            tryAction(promise, [prevPlayers, gamePhaseRef.current], [newPlayers, gamePhaseType.WAITING_FOR_MOVE], [setPlayers, setGamePhase] )
        } else if (isGm) {
            setNpcs(npcs => npcs.map(npc => npc.id === pickedEntityRef?.current?.entity.id ? {...npc, pos: {x: pos.xPos, y: pos.yPos}} :npc))
            const newNpcs =  npcsRef.current?.map(npc => npc.id === pickedEntityRef?.current?.entity.id ? {...npc, pos: {x: pos.xPos, y: pos.yPos}} :npc)
            const oldNpcs = npcsRef.current
            let promise = moveNPC(pickedEntityRef.current.entity.id, pos.xPos, pos.yPos)
            tryAction(promise, [oldNpcs, gamePhaseRef.current, pickedEntityRef.current], [newNpcs, gamePhaseType.WAITING_FOR_MOVE, null], [setNpcs, setGamePhase, setPickedEntity])
        }
        setPickedEntity(null)
        setShownEntity(null)
        setGamePhase(gamePhaseType.WAITING_FOR_MOVE)
        pickedPlayerId.current = null
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
        console.log('FIRES', pickedEntity)
        cellSizeRef.current = cellSize
        playersRef.current = players
        gamePhaseRef.current = gamePhase
        pickedEntityRef.current = pickedEntity
        npcsRef.current = npcs
    }, [cellSize, players, gamePhase, pickedEntity, npcs]);


    console.log('PLAYERS', players)
    return (
        <div className='game-field' style={{
            backgroundImage: `url(${location?.background})`,
            width: cellSize * location?.size[0],
            height: cellSize * location?.size[1],
        }} ref={locRef} onClick={e => handleClick.current?.(e)}>
            {players.map(c => <Character key={c.id} player={c}  />)}
            {npcs.map(n => <NPC key={n.id} npc={n}></NPC>)}
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