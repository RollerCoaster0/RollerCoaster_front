import React from 'react';
import Navbar from "../../common/navbar/Navbar";
import './style_home.css'
import {redirect} from "react-router-dom";


const HomePage = () => {
    return (
        <>

            <Navbar/>
            <div className="homepage" style={{backgroundImage: `url(../images/${getRandomImage()})`}}>
                <div className="sidebar-left">
                    <h2 class="color">Известные игроки и мастера</h2>
                    <p>Список с авто обновлением</p>
                </div>
                <div className="main-content">
                    <h1 class="color2">Добро пожаловать в D&D </h1>
                    <p>Добро пожаловать в мир приключений и фэнтези! Здесь вы сможете погрузиться в захватывающий мир игры Dungeons & Dragons и отправиться в увлекательные приключения вместе с друзьями. Подготовьтесь к захватывающим сражениям, встречам с загадочными существами и неожиданными поворотам сюжета. Готовы ли вы стать настоящим героем? Добро пожаловать в наш мир!
                    </p>
                </div>
                <div className="sidebar-right">
                    <h2 class="color">Скрины прекрассной игры</h2>
                    <p>Сюда нужны скрины</p>
                </div>
            </div>
        </>
    );
};

const getRandomImage = () => {
    const images = ['dk2.jpg', 'dk.jpg', 'theCoinOnWhich.jpg']; // замените названия файлов на ваши
    const randomNumber = Math.floor(Math.random() * images.length);

    return images[randomNumber];
};

export default HomePage;



