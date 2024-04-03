import {createContext, useEffect, useState} from "react";
import React from 'react';
import {devConsts} from "../util/util";

export const UserContext = createContext(undefined);

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const register = async (login, password) => {
        const response = await fetch(devConsts.api + '/auth/register?' + new URLSearchParams({login, password}), {
            method: 'POST',
        });
        if (response.ok) {
            storeUser({...await response.json()})
            setUser({name: login});
        }
        return response.status;
    }

    const logOut = () => {
        setUser(null);
    }
    const logIn = async (login, password) => {
        const response = await fetch(devConsts.api + '/auth/login?' + new URLSearchParams({login, password}), {
            method: 'POST',
        });
        if (response.ok) {
            storeUser({...await response.json()})
            setUser({name: login});
        }
        return response.status;
    }

    useEffect(() => {
        setUser(getStoredUser());
    }, []);

    return (
        <UserContext.Provider value={{user, register, logIn}}>
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

export default UserContextProvider;