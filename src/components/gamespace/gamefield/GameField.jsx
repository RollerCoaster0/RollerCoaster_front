import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../gamespace.css'
import Character from "../characters/Character";
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";
import {devConsts} from "../../../util/util";

const GameField = ({children}) => {
    const fieldRef = useRef(null);
    const handleClick = useRef(null)
    const {currentLocationId, cellSize, locations,  pickedCharacterId, gamePhase, setGamePhase, characters} = useContext(GameContext)
    const currentLocation = locations[currentLocationId]
    const field = {}

    return (
        <div className="game-field"
             style={{
                 backgroundImage: `url(${field?.background})`,
                 width: cellSize * field?.size[0],
                 height: field?.cellSize * field?.size[1]
             }}
             ref={fieldRef}
             onClick={e => handleClick.current?.(e)}>

            {characters?.map((character) => <Character {...character}/>)}
            {children}
        </div>
    );
};

function getInnerCoords(elRef, e) {
    return {
        x: e.clientX - elRef.current.getBoundingClientRect().left,
        y: e.clientX - elRef.current.getBoundingClientRect().top
    }
}

function calcGridPositionByCoords(coords, cellSize) {
    const xPos = Math.floor(coords.x / cellSize);
    const yPos = Math.floor(coords.y / cellSize);
    return {xPos, yPos};
}

export default GameField;