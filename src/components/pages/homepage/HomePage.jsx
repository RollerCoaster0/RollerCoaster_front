import React from 'react';
import './style_home.css'
import img1 from './images/dk.jpg'
import img2 from './images/dk2.jpg'
import img3 from './images/theCoinOnWhich.jpg'

const HomePage = () => {
    return (
        <>
            <div className="homepage" style={{backgroundImage: `url(${getRandomImage()})`}}>
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
    const images = [img1, img2, img3];
    const randomNumber = Math.floor(Math.random() * images.length);
    return images[randomNumber];
};

export default HomePage;



