import React, {useContext, useEffect, useRef} from 'react';
import '../gamespace.css'
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";
import Character from "../characters/Character";

const Location = ({location, locationCharacters}) => {
    const {cellSize, gamePhase, characters, setCharacters, pickedCharacter} = useContext(GameContext)
    const locRef = useRef()
    const handleClick = useRef(null)
    const pickedCharacterRef = useRef(null)
    const charactersRef = useRef(null)
    //TODO: узнать, можно ли обойтись без костылей для замыкания  ^^^
    const onWaitingForMove = () => {
        //
    }

    const makeMove = (e) => {
        const x = e.clientX - locRef.current.getBoundingClientRect().left
        const y = e.clientY - locRef.current.getBoundingClientRect().top
        const pos = calcGridPositionByCoords(x, y, cellSize)
        console.log(pickedCharacter)
        setCharacters(charactersRef.current.map(c => c.id === pickedCharacterRef.current.id ? {...c, pos: {x: pos.xPos, y: pos.yPos}} : c))
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
        console.log('EFFECT',pickedCharacter)
        pickedCharacterRef.current = pickedCharacter
        charactersRef.current = characters
    }, [pickedCharacter, characters]);


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
    return {
        x: e.clientX - elRef.current.getBoundingClientRect().left,
        y: e.clientX - elRef.current.getBoundingClientRect().top
    }
}

function calcGridPositionByCoords(x, y, cellSize) {
    const xPos = Math.floor(x / cellSize);
    const yPos = Math.floor(y / cellSize);
    return {xPos, yPos};
}

export default Location;