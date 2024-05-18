import React from 'react';
import {queryResult} from "../../../contexts/UserContext";

const AuthResultMessage = ({result}) => {
    let message;
    switch (result) {
        case queryResult.OK:
            message = <div style={{border: '5px green', width: 100, height: 40}}> Success!</div>
            break;
        case queryResult.NOT_FOUND:
            message = <div style={{border: '5px red', width: 100, height: 40}}> User not found</div>
            break;
        case queryResult.SERVER_ERROR:
            message = <div style={{border: '5px red', width: 100, height: 40}}>Something went wrong</div>
            break;
        case queryResult.CLIENT_ERROR:
            message = <div style={{border: '5px red', width: 100, height: 40}}>Something went wrong</div>
            break;
        default:
            message = <div style={{border: '5px green', width: 100, height: 40}}> Success!</div>
    }
    return (
        message
    );
};

export default AuthResultMessage;