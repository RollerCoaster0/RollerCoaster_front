import {createContext, useEffect, useRef, useState} from "react";
import {getStaticCharacters, getStaticField} from "../../util/util";
import {useFieldParams} from "../../hooks/useFieldParams";

export const GameContext = createContext(undefined);

export const GameContextProvider = ({children}) => {
    const [field, setField] = useState(getStaticField());
    const [characters, setCharacters] = useState([]);
    const [ownedCharacters, setOwnedCharacters] = useState([]);
    const fieldParams = useFieldParams(0);
    const [pickedCharacter, setPickedCharacter] = useState(0);
    const waitingForMove = useRef(true);

    useEffect(() => {
        const [c, oC] = getStaticCharacters();
        setCharacters(c);
        setOwnedCharacters(oC);
    }, [field]);

    return <GameContext.Provider value={{field, setField, fieldParams, characters, ownedCharacters, pickedCharacter, setPickedCharacter, waitingForMove}}>
        {children}
    </GameContext.Provider>
}