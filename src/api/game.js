import {devConsts} from "../util/util";
import {getCredentials} from "../contexts/UserContext";

export async function sendMove(x, y, id) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/players/${id}/move?${new URLSearchParams({X: x, Y: y})}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

export async function sendRoll(id, die) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/players/${id}/roll?${new URLSearchParams({Die: die})}`, {
        method: 'POST',
        headers: {
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
    console.log('TRYAC', prevStates, newStates, stateSetters)
    try {
        stateSetters.forEach((setter, i) => setter(newStates[i]))
        const response = await promise
        if (!response.ok) {
            stateSetters?.forEach((setter, i) => setter(prevStates[i]))
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
    return await fetch(devConsts.api + `/players?${new URLSearchParams({sessionId})}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function createSession(session) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + '/sessions?' + new URLSearchParams({
        Name: session.name,
        GameId: session.id,
        Description: session.description
    }),
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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

export async function startSession(id) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/sessions/${id}/start`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


export async function fetchAvatar(path) {
    const token = getCredentials()?.token
    return await fetch(devConsts.minio + `/${path}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


export async function setAvatars(players) {
    if (!players) return
   for (const p of players) {
      const response = await fetchAvatar(p.avatarFilePath)
       if (!response.ok) {
           //TODO: handle
       } else {
           const blob = await response.blob()
           p.avatar = URL.createObjectURL(blob)
       }
   }
}

export async function moveNPC(id, X, Y) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/anpc/${id}/move?` + new URLSearchParams({X, Y}), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


export async function sendRollByNpc(id, die) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/anpc/${id}/roll?` + new URLSearchParams({die}), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}



async function fetchANPC(id) {

}
export async function fethcANPCs(sessionId) {
    const token = getCredentials()?.token
    return await  fetch(devConsts.api + '/anpc?' + new URLSearchParams({sessionId}), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function changeHpNpc(npcId, HP) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/anpc/${npcId}/changeHp?` + new URLSearchParams({HP}), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )
}

export async function changeHpPlayer(id, HP) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/players/${id}/changeHp?` + new URLSearchParams({HP}), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )
}
export async function sendUseSkillByNPC(skillId, anpcId) {
        const token = getCredentials()?.token
        return await fetch(devConsts.api + `/anpc/${anpcId}/useSkill?` + new URLSearchParams({skillId}), {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}

export async function sendUseSkill(skillId, playerId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/players/${playerId}/useSkill?` + new URLSearchParams({skillId}), {
       method: 'POST',
       headers: {
           'Authorization': `Bearer ${token}`
       }
    })
}
