import {createContext, useEffect, useState} from "react";
import React from 'react';
import {devConsts} from "../util/util";

export const authResult = {
    OK: 0,
    NOT_FOUND: 1,
    SERVER_SIDE_ERROR: 2,
    CLIENT_SIDE_ERROR: 3
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
                storeUser({...await response.json()})
                setUser({name: login});
            }
            return toAuthResult(response.status);
        } catch (e) {
            return authResult.CLIENT_SIDE_ERROR;
        }
    }

    const logOut = () => {
        setUser(null);
        removeUser();
    }
    const logIn = async (login, password) => {
        try {
            const response = await fetch(devConsts.api + '/auth/login?' + new URLSearchParams({login, password}), {
                method: 'POST',
            });
            if (response.ok) {
                storeUser({...await response.json()})
                setUser({name: login});
            }
            return toAuthResult(response.status);
        } catch (e) {
            return authResult.CLIENT_SIDE_ERROR;
        }
    }

    useEffect(() => {
        setUser(getStoredUser());
    }, []);

    return (
        <UserContext.Provider value={{user, register, logIn, logOut}}>
            {children}
        </UserContext.Provider>
    );
};


function getStoredUser() {
    return localStorage.getItem(devConsts.userKey);
}

function storeUser(user) {
    localStorage.setItem(devConsts.userKey, user);
}

function removeUser() {
    localStorage.removeItem(devConsts.userKey);
}

function toAuthResult(statusCode) {

    if (statusCode >= 200 && statusCode < 300) {
        return authResult.OK;
    }

    if (statusCode >= 400 && statusCode < 500) {
        return authResult.NOT_FOUND;
    }

    return authResult.SERVER_SIDE_ERROR;

}


export default UserContextProvider;
