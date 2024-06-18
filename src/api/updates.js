import {devConsts} from "../util/util";
import {getCredentials} from "../contexts/UserContext";

export async function fetchEvent(deviceId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + '/longpoll?' + new URLSearchParams({deviceId}), {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

export async function fetchInitEvent() {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + '/longpoll', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

export async function fetchChatMessages(sessionId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/messages?${new URLSearchParams({sessionId, count: 50})}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

export async function sendTextMessage(text, sessionId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + '/messages/sendText?' + new URLSearchParams({text, sessionId}), {
        method: 'POST',
        headers:  {
            'Authorization': `Bearer ${token}`,
        }
    } )
}