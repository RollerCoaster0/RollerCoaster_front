import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../../common/footer/Footer";
import Navbar from "../../common/navbar/Navbar";

const PageLayout = ({children}) => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default PageLayout;