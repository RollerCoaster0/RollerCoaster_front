import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../gamespace.css'
import Character from "../characters/Character";
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";
import {devConsts} from "../../../util/util";
import {useZoom} from "../../../hooks/useZoom";

const GameField = ({children}) => {
    const {setCellSize} = useContext(GameContext)
    const fieldRef = useRef()
    useZoom(fieldRef, devConsts.defaultCellSize, setCellSize)
    return (
        <div ref={fieldRef} style={{width: 9000, height: 5000}} >
            {children}
        </div>
    )
};

export default GameField;