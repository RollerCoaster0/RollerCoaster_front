import React from 'react';
import Navbar from "../../common/navbar/Navbar";
import {Outlet} from "react-router-dom";
import UserContextProvider from "../../../contexts/UserContext";

const GamePageLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default GamePageLayout;