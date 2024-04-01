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
        setUser(response.ok ? {login} : null);
        return response.status;
    }

    const logIn = async (login, password) => {
        const response = await fetch(devConsts.api + '/auth/login?' + new URLSearchParams({login, password}), {
            method: 'POST',
        });
        setUser(response.ok ? {login} : null);
        return response.status;
    }

    const saveUser = (user) => {
        storeUser(user);
        setUser(user);
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


function getStoredUser(userId) {
    return localStorage.getItem('id');
}

function storeUser(user) {
    localStorage.setItem(`${user.id}`, user);
}

function storeToken(token) {
    localStorage.setItem('rcToken', token);
}

function getToken(token) {
    return localStorage.getItem('rcToken');
}

export default UserContextProvider;