import {devConsts} from "../util/util";
import {getCredentials} from "../contexts/UserContext";

export async function sendMove(x, y, id) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/players/${id}/move?${new URLSearchParams({X:x, Y:y})}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

export async function sendRoll(id, die) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/players/${id}?${new URLSearchParams({die})}`, {
        headers: {
            method: 'POST',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export async function snedUseSkill(id, skillId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/players/${id}?${new URLSearchParams({skillId})}`, {
        headers: {
            method: 'POST',
            'Authorization': `Bearer ${token}`,
        }
    })
}


export async function tryAction(promise, prevStates, newStates, stateSetters) {
    try {
        stateSetters.forEach((setter, i) => setter(newStates[i]))
        const response = await promise
        if (!response.ok) {
            stateSetters.forEach((setter, i) => setter(prevStates[i]))
            console.log('ROLLBACK')
            //TODO: proccess
        }
    } catch (e) {
        stateSetters.forEach((setter, i) => setter(prevStates[i]))
        console.log('ROLLBACK')
        console.log('EVENT SENDING ERROR', e)
        //TODO: proccess
    }

}


export async function fetchSessionInfo(sessionId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/sessions/${sessionId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function fetchGame(gameId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/games/${gameId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


async function fetchLocationBackground(path) {
    const token = getCredentials()?.token
    return await fetch(devConsts.minio + path, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function fetchLocationsBackground(pathes) {
    const token = getCredentials()?.token
    let backgrounds = []
    try {
        for (let path of pathes) {
            let resp = await fetch(`${devConsts.minio}/${path}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!resp.ok) {
                //TODO: handle
                console.log('FAILED TO FETCH BACKGROUND', path)
                continue
            }
            let blob = await resp.blob()
            backgrounds.push(URL.createObjectURL(blob))
        }
        return backgrounds
    } catch (e) {
        console.log('ERROR WHILE FETCHING BACKGROUNDS', e)
    }
}

export async function fetchPlayers(sessionId) {
    const token = getCredentials()?.token
    let response =  await fetch(devConsts.api + `/players?${new URLSearchParams({sessionId})}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await response.json()
}

export async function fetchClasses(classIds) {
    const token = getCredentials()?.token
    const classes = []
    for (let id of classIds) {
        const chClass = await fetch(devConsts.api + `/classes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        classes.push(chClass)
    }
    return classes
}