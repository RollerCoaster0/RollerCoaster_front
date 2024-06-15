import React, {useContext} from 'react';
import {AlertContext} from "../../contexts/AlertContext";
import {Alert, Snackbar} from "@mui/material";

const AlertMessage = () => {
    const {alertMessage} = useContext(AlertContext)
    console.log('AL MES', alertMessage)
    return (
        alertMessage ?
            <Snackbar message={alertMessage} anchorOrigin={{vertical: 'top', horizontal: 'center'}}/> : null
    );
};

export default AlertMessage;