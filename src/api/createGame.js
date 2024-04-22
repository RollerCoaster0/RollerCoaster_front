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
    [gameComponentType.QUEST, '/quest'],
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

// async function t() {
//     const devConsts = {
//         defaultCellSize: 100,
//         api: 'http://localhost:5050',
//         tokenKey: 'RollerCoasterToken',
//         userKey: 'RollerCoasterUser'
//     };
//     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2IiwibmJmIjoxNzEzNzE0ODM0LCJleHAiOjE3MTQ5MjQ0MzQsImlhdCI6MTcxMzcxNDgzNCwiaXNzIjoiUm9sbGVyQ29hc3RlckFQSSIsImF1ZCI6IlJvbGxlckNvYXN0ZXJXZWJDbGllbnQifQ.zs92AuvUZamkq7p7WlaFlV_3iS29wloJHAPGM3K7KqI';
//     let gameInfo = {name: 'test', description: 'test'}
//     let res = await fetch(devConsts.api + '/games?' + new URLSearchParams(gameInfo), {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//             'Authorization': `Bearer ${token}`
//         },
//     });
//
// }

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