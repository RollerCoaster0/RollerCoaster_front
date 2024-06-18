import {devConsts} from "../util/util";
import {getCredentials} from "../contexts/UserContext";
import {queryByTestId} from "@testing-library/react";

const gameComponentType = {
    ITEM: 0,
    NPC: 1,
    LOCATION: 2,
    QUEST: 3,
    SKILL: 4,
    CLASS: 5
}

const gameComponentEndpoints = new Map([
    [gameComponentType.ITEM, '/items'],
    [gameComponentType.NPC, '/npc'],
    [gameComponentType.LOCATION, '/locations'],
    [gameComponentType.QUEST, '/quests'],
    [gameComponentType.SKILL, '/skills'],
    [gameComponentType.CLASS, '/classes'],
]);

export async function createGame(items, NPCs, quests, gameInfo, locations, skills, characterClasses) {
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
            const id = loc.id;
            let width = loc.width
            let heigth = loc.width

            loc = {name: loc.name, description: loc.description, isBase: loc.baseLocation ? 1 : 0};
            res = await createGameComponent(loc, gameComponentType.LOCATION, gameId);
            if (!res.ok) {
                return {ok: false, message: res.status}
            }
            let locationData = await res.json();
            console.log(locationData)
            res = await setLocationMap(map, locationData.id, width, heigth);
            if (!res.ok) {
                return {ok: false, message: res.status}
            }

            locationIds.set(id, locationData.id);
        }
        let chClassIds = new Map()
        let npcIds = new Map()

        for (let npc of NPCs) {
            let id = npc.id
            npc = {name: npc.name, locationId: locationIds.get(npc.location.id)}
            res = await createGameComponent(npc, gameComponentType.NPC, gameId);
            let data = await res.json()
            npcIds.set(id, data.id)
            if (!res.ok) {
                return {ok: false, message: res.status}
            }
        }

        for (let quest of quests) {
            let id = quest.id
            quest = {name: quest.name, description: quest.description, hiddenDescription: quest.hiddenDescription}
            res = await createGameComponent(quest, gameComponentType.QUEST, gameId)
            if (!res.ok) {
                return {ok: false, message: res.status}
            }

        }


        for (let characterClass of characterClasses) {
            let id = characterClass.id
            characterClass = {name: characterClass, description: characterClass.description}
            res = await createGameComponent(characterClass, gameComponentType.CLASS, gameId)
            if (!res.ok) {
                console.log(characterClass, res)
                return {ok: false, message: res.status}
            }
            let data = await res.json()
            chClassIds.set(id, data.id)

        }
        for (let skill of skills) {
            let id = skill.id
            skill = {
                name: skill.name,
                description: skill.description,
                AvailableOnlyForCharacterClassId: chClassIds.get(skill.chClass.id),
                AvailableOnlyForNonPlayableCharacterId: npcIds.get(skill.npc.id)
            }
            res = await createGameComponent(skill, gameComponentType.SKILL, gameId)
            console.log(skill, res)
            if (!res.ok) {
                console.log(skill, res)
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