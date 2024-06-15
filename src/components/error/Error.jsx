import React from 'react';
import {useRouteError} from "react-router-dom";
import {Paper} from "@mui/material";

const Error = () => {
    const error = useRouteError()
    return (
        <Paper sx={{
            backgroundColor: '#C80036',
            marginTop: '250px',
            width: '100%',
            height: '300px',
            textAlign: 'center',
            paddingTop: '100px',
            fontSize: 50,
            color: 'white'
        }}>
            {error.message}</Paper>
    );
};

export default Error;