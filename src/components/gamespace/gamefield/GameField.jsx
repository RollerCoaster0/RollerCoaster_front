import React, {useContext, useRef} from 'react';
import '../gamespace.css'
import {GameContext} from "../../../contexts/GameContext";
import {devConsts} from "../../../util/util";
import {useZoom} from "../../../hooks/useZoom";
import desk from '../../../devassets/wooden_desk.jpg'
import {gamePhaseType} from "../../pages/gamepage/GamePage";

const GameField = ({children}) => {
    const {setCellSize, setGamePhase, setPickedEntity, setShownEntity} = useContext(GameContext)
    const fieldRef = useRef()
    useZoom(fieldRef, devConsts.defaultCellSize, setCellSize)
    const handleClick = () => {
        setPickedEntity(null)
        setShownEntity(null)
        setGamePhase(gamePhaseType.WAITING_FOR_MOVE)
    }
    return (
        <>
            <div ref={fieldRef} style={{width: 9000, height: 5000, backgroundImage: `url(${desk})`, cursor: 'auto'}} onClick={handleClick}>
                {children}
            </div>
        </>
    )
};

export default GameField;