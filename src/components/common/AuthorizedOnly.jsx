import React, {useContext} from 'react';
import {UserContext} from "../../contexts/UserContext";
import {Navigate} from "react-router-dom";

const AuthorizedOnly = ({children}) => {
    const {user} = useContext(UserContext)
    console.log('USER IS', user)
    return user ? children : <Navigate to={'/authentication'}/>
};

export default AuthorizedOnly;