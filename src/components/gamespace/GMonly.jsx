import React, {useContext} from 'react';
import {UserContext} from "../../contexts/UserContext";
import {GameContext} from "../../contexts/GameContext";

const GMonly = ({children}) => {
    const {user} = useContext(UserContext)
    const {session} = useContext(GameContext)
    return user.id === session.gameMasterUserId ? children : null

};

export default GMonly;