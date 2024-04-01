import React, {useContext} from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../../common/footer/Footer";
import Navbar from "../../common/navbar/Navbar";
import UserContextProvider, {UserContext} from "../../../contexts/UserContext";

const PageLayout = ({children}) => {
    return (
        <>
            <UserContextProvider>
                <Navbar/>
                <Outlet/>
                <Footer/>
            </UserContextProvider>
        </>
    );
};

export default PageLayout;