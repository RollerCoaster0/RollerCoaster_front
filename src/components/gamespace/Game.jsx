import React, {useContext, useEffect, useRef} from 'react'
import {GameContext} from "../../contexts/GameContext"
import Location from "./locations/Location";
import GameField from "./gamefield/GameField";
import useDraggableScroll from "use-draggable-scroll";

const Game = () => {
    const {locations, currentLocation, players} = useContext(GameContext)
    const fieldRef = useRef()
    const {onMouseDown} = useDraggableScroll(fieldRef)

    useEffect(() => {
        const horOffset = fieldRef.current.scrollWidth * 0.4
        const verOffset = fieldRef.current.scrollHeight * 0.4
        fieldRef.current.scrollLeft = horOffset
        fieldRef.current.scrollTop = verOffset
    }, []);

    return (
        <>
            <div onMouseDown={onMouseDown}  ref={fieldRef} className='game-field-wrapper'>
                <GameField>
                    <Location location={currentLocation}
                              locationCharacters={players.filter(c => c.locationId === currentLocation.id)}/>
                </GameField>
            </div>
        </>
    );
};

export default Game;