import {devConsts} from "../util/util";


export async function register(login, password) {
    return await fetch(devConsts.api + '/auth/register?' + new URLSearchParams({login, password}), {
        method: 'POST',
    });
}