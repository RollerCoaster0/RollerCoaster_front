import './homepage.css'
import img1 from './assets/Logotop.png'
import img2 from './assets/Rectangle 7(1).png'
import img3 from './assets/Rectangle 8.png'
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (

        <main className="content">
            <p className="content__grid-item1">Добро пожаловать в мир приключений и фэнтези! </p>
            <img src={img1} className="content__grid-item2" alt="aboba"/>

            <p className="content__grid-item4">Здесь вы сможете погрузиться в захватывающие миры и отправиться в
                увлекательные приключения вместе с друзьями. </p>
            <img src={img2} className="content__grid-item3" alt="aboba"/>
            <p className="content__grid-item5">Подготовьтесь к захватывающим сражениям, встречам с загадочными
                существами и
                неожиданным поворотам сюжета!
            </p>
            <img src={img3} className="content__grid-item6" alt="aboba"/>
            <div className="content__grid-item7">
                <p>Готовы стать настоящим героем?<br/>
                    Добро пожаловать в наш мир
                </p>
                <button className="content__grid-item7__play-button"
                        onClick={() => navigate("/authentication")}>
                    <p style={{
                        fontSize: 50,
                        fontFamily: 'Kelly Slab, serif',
                        color: 'white',
                        margin: 'auto'
                    }}>Играть!</p>
                </button>
            </div>
        </main>
    );
};


export default HomePage;



