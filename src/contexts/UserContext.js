import {createContext, useEffect, useState} from "react";
import React from 'react';
import {devConsts} from "../util/util";

export const queryResult = {
    OK: 0,
    NOT_FOUND: 1,
    SERVER_ERROR: 2,
    CLIENT_ERROR: 3,
    UNAUTHORIZED: 4,
    FORBIDDEN: 5,
    BAD_REQUEST: 6
};
export const UserContext = createContext(undefined);

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const register = async (login, password) => {
        try {
            const response = await fetch(devConsts.api + '/auth/register?' + new URLSearchParams({login, password}), {
                method: 'POST',
            });
            if (response.ok) {
                const creds = await response.json()
                storeCredentials({...creds, name: login})
                setUser({name: login, id: creds.id});
            }
            return toQueryResult(response.status);
        } catch (e) {
            return queryResult.CLIENT_ERROR;
        }
    }

    const logOut = () => {
        setUser(null);
        clearCredentials();
    }
    const logIn = async (login, password) => {
        try {
            const response = await fetch(devConsts.api + '/auth/login?' + new URLSearchParams({login, password}), {
                method: 'POST',
            });
            if (response.ok) {
                const creds = await response.json()
                storeCredentials({...creds, name: login})
                setUser({name: login, id: creds.id});
            }
            return toQueryResult(response.status);
        } catch (e) {
            console.log(e)
            return queryResult.CLIENT_ERROR;
        }
    }

    const getMe = async () => {
        const token = getCredentials()?.token
        try {
            const response = await fetch(devConsts.api + '/users/me', {
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${token}`
                },
            });

            const userData = await response.json();
            setUser({name: userData.login, id: userData.userId});
            return queryResult.OK;
        } catch (e) {
            return queryResult.CLIENT_ERROR;
        }
    }

    useEffect(() => {
        setUser(getCredentials());
    }, []);

    return (
        <UserContext.Provider value={{user, register, logIn, logOut}}>
            {children}
        </UserContext.Provider>
    );
};


export function getCredentials() {
    return JSON.parse(localStorage.getItem(devConsts.userKey));
}

export function storeCredentials(user) {
    localStorage.setItem(devConsts.userKey, JSON.stringify(user));
}

export function clearCredentials() {
    localStorage.removeItem(devConsts.userKey);
}

function toQueryResult(statusCode) {

    if (statusCode >= 200 && statusCode < 300) {
        return queryResult.OK;
    }

    if (statusCode === 401) {
        return queryResult.UNAUTHORIZED;
    }

    if (statusCode === 403) {
        return queryResult.FORBIDDEN;
    }
    if (statusCode === 400) {
        return queryResult.BAD_REQUEST;
    }

    return queryResult.SERVER_ERROR;

}


export default UserContextProvider;
