import React, {useContext} from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../../common/footer/Footer";
import Navbar from "../../common/navbar/Navbar";
import UserContextProvider from "../../../contexts/UserContext";

const PageLayout = ({children}) => {
    return (
        <>
                <Navbar/>
                <div className="wrapper">
                    <Outlet/>
                </div>
                <Footer/>
        </>
    );
};

export default PageLayout;