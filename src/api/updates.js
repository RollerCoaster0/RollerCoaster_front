import {devConsts} from "../util/util";
import {getCredentials} from "../contexts/UserContext";

export async function fetchEvent() {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + '/longpoll', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        }
    })
}


export async function fetchChatActions(sessionId) {
    const token = getCredentials()?.token
    return await fetchEvent(devConsts.api + `/chats?${new URLSearchParams({sessionId})}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}