import React from 'react';
import {authResult} from "../../../contexts/UserContext";

const AuthResultMessage = ({result}) => {
    console.log(result)
    let message;
    switch (result) {
        case authResult.OK:
            message = <div style={{border: '5px green', width: 100, height: 40}}> Success!</div>
            break;
        case authResult.NOT_FOUND:
            message = <div style={{border: '5px red', width: 100, height: 40}}> User not found</div>
            break;
        case authResult.SERVER_SIDE_ERROR:
            message = <div style={{border: '5px red', width: 100, height: 40}}>Something went wrong</div>
            break;
        case authResult.CLIENT_SIDE_ERROR:
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