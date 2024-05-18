import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../gamespace.css'
import Character from "../characters/Character";
import {GameContext, gamePhaseType} from "../../../contexts/GameContext";
import {devConsts} from "../../../util/util";

const GameField = ({children}) => {
    return (
        <div  style={{width: 9000, height: 5000}} >
            {children}
        </div>
    )
};

export default GameField;