import React, {useContext, useRef} from 'react';
import '../gamespace.css'
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";
import {devConsts} from "../../../util/util";
import {useZoom} from "../../../hooks/useZoom";
import desk from '../../../devassets/wooden_desk.jpg'
import {Button} from "@mui/material";

const GameField = ({children}) => {
    const {setCellSize, setGamePhase} = useContext(GameContext)
    const fieldRef = useRef()
    useZoom(fieldRef, devConsts.defaultCellSize, setCellSize)
    return (
        <>
            <div ref={fieldRef} style={{width: 9000, height: 5000, backgroundImage: `url(${desk})`, cursor: 'auto'}}>
                {children}
            </div>
        </>
    )
};

export default GameField;