import React from 'react';
import Navbar from "../../common/navbar/Navbar";
import './style_home.css'



const HomePage = () => {

    return (
<>
    <Navbar/>
        <div className="homepage">
            <div className="sidebar-left">
                <h2>Рассказы про днд епта</h2>
                <p>Сюда нужна хуйня или кнопки</p>
                <div/>
                <div className="main-content">
                    <h1>Добро пожаловать в ад </h1>
                    <p>здесь вы получите передоз ДНД</p>
                </div>
                <div className="sidebar-raight">
                <h2>Рассказы про днд епта</h2>
                <p>Сюда нужна хуйня или кнопки</p>
                </div>
            </div>
        </div>
    </>
    );
};

export default HomePage;