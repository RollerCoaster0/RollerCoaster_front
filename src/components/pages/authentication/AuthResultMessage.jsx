import React from 'react';
import {queryResult} from "../../../contexts/UserContext";
import {Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const AuthResultMessage = ({result}) => {
    let message;
    switch (result) {
        case queryResult.OK:
            message = <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">Success!</Alert>
            break
        case queryResult.NOT_FOUND:
           message = <Alert severity="error">Either login or password is incorrect</Alert>
            break
        case queryResult.SERVER_ERROR:
            message = <Alert severity="error">Something went wrong. Try again!</Alert>
            break
        default:
            message = <Alert severity="error">Something went wrong. Try again!</Alert>
    }
    return (
        <>
            {message}
        </>
    );
};

export default AuthResultMessage;