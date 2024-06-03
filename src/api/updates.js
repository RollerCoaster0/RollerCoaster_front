import {devConsts} from "../util/util";
import {getCredentials} from "../contexts/UserContext";

export async function fetchEvent() {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + '/longpoll', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}


export async function fetchChatMessages(sessionId) {
    const token = getCredentials()?.token
    return await fetch(devConsts.api + `/chats?${new URLSearchParams({sessionId})}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}