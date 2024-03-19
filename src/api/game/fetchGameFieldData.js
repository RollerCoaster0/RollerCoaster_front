import background from '../../devassets/grid.png'
import {useEffect, useState} from "react";
import greenAvatar from '../../devassets/green_player.png'
import redAvatar from '../../devassets/red_player.png'

export function useFetchGameFieldData(sessionId) {
    //заглушки чтобы протестить
    const [gameFieldData, setGameFieldData] = useState(null);
    const fieldData = [];
    for (let i = 0; i < 8; i++) fieldData.push([0, 0, 0, 0, 0, 0, 0, 0]);
    const characters = [{avatar: redAvatar, attributes: null, position: {x: 0, y: 0}}];
    const ownedCharacters = [{avatar: greenAvatar, attributes: null, position: {x: 2, y: 3}}];
    const size = [8, 8];
    //

    useEffect(() => {
        setTimeout(() => {
            setGameFieldData({
                background,
                fieldData,
                characters,
                ownedCharacters,
                size
            });
        }, 2000);
    }, []);

    return gameFieldData;
}

