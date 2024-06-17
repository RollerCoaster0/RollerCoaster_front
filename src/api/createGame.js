import {devConsts} from "../util/util";
import {getCredentials} from "../contexts/UserContext";

const gameComponentType = {
    ITEM: 0,
    NPC: 1,
    LOCATION: 2,
    QUEST: 3
}

const gameComponentEndpoints = new Map([
    [gameComponentType.ITEM, '/items'],
    [gameComponentType.NPC, '/npc'],
    [gameComponentType.LOCATION, '/locations'],
    [gameComponentType.QUEST, '/quests'],
]);

export async function createGame(items, NPCs, quests, gameInfo, locations) {
    try {
        let res = await initGame(gameInfo);
        if (!res.ok) {
            return {ok: false, message: res.status}
        }
        const game = await res.json();
        const gameId = game.id;

        for (const item of items) {
            res = await createGameComponent(item, gameComponentType.ITEM, gameId);
            if (!res.ok) {
                return {ok: false, message: res.status}
            }
        }

        const locationIds = new Map();

        for (let loc of locations) {
            const map = loc.map;
            const id  = loc.id;

            loc = {name: loc.name, description: loc.description};
            res = await createGameComponent(loc, gameComponentType.LOCATION, gameId);
            if (!res.ok) {
                return {ok: false, message: res.status}
            }
            let locationData = await res.json();
            console.log(locationData)
            res = await setLocationMap(map, locationData.id);
            if (!res.ok) {
                return {ok: false, message: res.status}
            }

            locationIds.set(id, locationData.id);
        }

        for (let npc of NPCs) {
            npc = {name: npc.name, locationId: locationIds.get(npc.location.id)}
            res = await createGameComponent(npc, gameComponentType.NPC, gameId);
            if (!res.ok) {
                return {ok: false, message: res.status}
            }
        }

        for (const quest of quests) {
            res = await createGameComponent(quest, gameComponentType.QUEST, gameId);
            if (!res.ok) {
                return {ok: false, message: res.status}
            }
        }

        return {ok: true, message: null}

    } catch (e) {
        return {ok: false, message: e.toString()}
    }
}

export async function initGame(gameInfo) {
    const token = getCredentials()?.token;
    return await fetch(devConsts.api + '/games?' + new URLSearchParams(gameInfo), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        },
    });
}


export async function createGameComponent(gameComponent, gameComponentType, gameId) {
    gameComponent = {...gameComponent, gameId};
    const token = getCredentials()?.token;
    return await fetch(devConsts.api + `${gameComponentEndpoints.get(gameComponentType)}?` + new URLSearchParams(gameComponent), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    });
}

async function setLocationMap(map, locationId) {
    const formData = new FormData();
    const token = getCredentials()?.token;
    formData.append('file', map);
    return await fetch(devConsts.api + `/locations/${locationId}/map`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });
}