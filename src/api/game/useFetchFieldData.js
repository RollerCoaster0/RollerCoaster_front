import {useState} from "react";

export function useFetchFieldData(sessionId) {
    const [field, setField] = useState(null);
    //заглушка
    const gameField = [];
    for (let i = 0; i < 8; i++) gameField.push([0, 0, 0, 0, 0, 0, 0, 0]);
    gameField[0][0] = 1;
    gameField[2][3] = 0;
    setTimeout(() => {
        setField(gameField);
    }, 1000);

    return field;
}