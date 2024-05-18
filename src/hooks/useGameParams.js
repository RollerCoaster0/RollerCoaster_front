import {useRef, useState} from "react";
import {getStaticField, getStaticFieldParams} from "../util/util";
import {useFieldParams} from "./useFieldParams";

export function useGameParams() {
    const [field, setField] = useState(getStaticField())
    const [characters, setCharacters] = useState([])
    const fieldParams = useFieldParams(0);
    const [pickedCharacter, setPickedCharacter] = useState(null)
    const waitingForMove = useRef(true)
    const [gameState, setGameState] = useState()
    const gameParams = useRef({
        pickedCharacter: null,
        setPickedCharacter,
        fieldParams: getStaticFieldParams(),
        characters,
        setCharacters,
    })
    return gameParams
}