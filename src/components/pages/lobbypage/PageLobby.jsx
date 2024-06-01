import React, {useState, useEffect} from 'react';
import img from "./img/x.jpg"

const PageLobby = () => {
    const [gameTitle, setGameTitle] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [gameId, setGameId] = useState('');

    // Функция для генерации случайного ID
    const generateId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    useEffect(() => {
        // Генерация случайного ID при загрузке компонента
        setGameId(generateId());

        // Загрузка данных игры из бекенда
        fetch('/api/game')
            .then(response => response.json())
            .then(data => {
                setGameTitle(data.title);
                setGameDescription(data.description);
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
            });

        // Загрузка списка пользователей из бекенда
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div style={{
            marginTop: '40px',
            marginBottom: '40px',
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '30px',
            flexDirection: 'column',
            alignItems: "center",
            padding: '20px',
            maxWidth: '900px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                backgroundColor: 'darkolivegreen',
                fontFamily: 'Kelly Slab, serif',
                borderRadius: '15px',
                padding: '10px',
                textAlign: 'center',
                width: '80%',
            }}>Красота{gameTitle}</h1>
            <img
                src={img} // Замените на настоящий URL изображения
                alt="Ошибка соединения позвоните на номер 8 950 715 54 47"
                style={{marginTop: '30px', marginBottom: '30px', borderRadius: '10px', width: '80%', height: 'auto',}}
            />
            <p style={{alignSelf: 'start',fontSize:'20px',marginLeft:'90px', fontFamily: 'Kelly Slab, serif',}}>ID игры: {gameId}</p>
            <div style={{
                marginBottom: '30px',
                padding: '10px',
                fontFamily: 'Kelly Slab, serif',
                borderRadius: '15px',
                backgroundColor: '#D9D9D9',
                marginTop: '30px',
                background: '#D9D9D9',
                width: '80%',
            }}>
                <h2 style={{textAlign: "center", fontFamily: 'Kelly Slab, serif',}}>Описание игры</h2>
                <p> Ингредиенты
                    Зерновые:
                    0.7 кг (4.9%) | Курский солод - Жженый / Black (Россия) цвет = 535 L°, экстракт = 70 % | Внесение в
                    конце затирания.
                    10 кг (69.9%) | Курский солод - Венский / Vienna (Россия) цвет = 3.5 L°, экстракт = 81 % | Внесение
                    в начале затирания.
                    1 кг (7.0%) | Курский солод - Карамельный 150 (Россия) цвет = 57 L°, экстракт = 75 % | Внесение в
                    начале затирания.
                    1 кг (7.0%) | Курский солод - Мюнхенский тип 2 (Россия) цвет = 8.5 L°, экстракт = 78 % | Внесение в
                    начале затирания.
                    1 кг (7.0%) | Dingemans - Жженый / Mroost 900 (Бельгия) цвет = 340 L°, экстракт = 70 % | Внесение в
                    начале затирания.
                    Всего: 13.7 кг (95.8%)

                    Сахаросодержащие:
                    0.6 кг (4.2%) | Лактоза цвет = 0.5 L°, экстракт = 90 % | Внесение в котел, кипятить 30 мин.
                    Всего: 0.6 кг (4.2%)

                    Хмель:
                    50 гр (11.9 IBU) | Каскад / Cascade (США) - в гранулах, a-к.=5.7% | Внесение в котел, кипятить 60
                    мин.
                    42 гр (4.7 IBU) | Ранний Московский (Россия) - в гранулах, a-к.=3.3% | Внесение в котел, кипятить 30
                    мин.
                    50 гр (3.7 IBU) | Жатецкий / Saaz (Чехия) - в гранулах, a-к.=3.5% | Внесение в котел, кипятить 10
                    мин.
                    Всего: 142 гр (20.3 IBUs)

                    Дрожжи:
                    Mangrove Jacks - Бельгийский эль M41 | Брожение: 23 °С, Аттенюация: 0 %, Флокуляция: средняя |
                    Внесение на главное брожение.
                    Для брожения рекомендуется 594 млрд. дрожжевых клеток: 5 свежих пакетов или флаконов жидких дрожжей
                    или 29 грамм сухих дрожжей.

                    Параметры затирания
                    Метод затирания: Зерновой (настойное затирание)
                    Температурные паузы:
                    Мальтозная пауза (Прямой нагрев): 63°С - 20 мин.
                    Осахаривание (Прямой нагрев): 67°С - 60 мин.
                    Декстриновая пауза (Прямой нагрев): 72°С - 20 мин.
                    Мэш аут (Прямой нагрев): 78°С - 5 мин.
                    Потребность в воде:
                    Заторная вода: 50.7 л (гидромодуль 3.7 л/кг) | Промывная вода: 32.6 л (абсорбция зерна 0.9 л/кг) |
                    Всего воды: 83.3 л

                    Параметры варки
                    Эффективность варки: 72 %
                    Время кипячения: 90 мин | Вирпул/отстой после кипячения: 0 мин | Охлаждение: 30 мин
                    Размер партии после кипячения: 60 л. | Испарение: 15.5 % | Размер партии перед кипячением: 71 л.
                    Плотность сусла перед кипячением: Доступно только для пользователей

                    Параметры карбонизации
                    Объем партии после брожения: 54 л. | Температура карбонизации: 23 °С
                    Праймер:
                    Карбонизация давлением из баллона давление: psi = 29 или bar = 2 | Итоговый объем СO2 = 2.39 (4.78
                    г/л)

                    Дополнительные параметры
                    Энергетическая ценность: Доступно только для пользователей
                    Оценочная стоимость рецепта: Доступно только для пользователей
                    {gameDescription}
                </p>
            </div>
            <div style={{
                marginTop: '30px',
                padding: '10px',
                borderRadius: '15px',
                fontFamily: 'Kelly Slab, serif',
                backgroundColor: 'darkolivegreen',
                width: '80%',
                alignItems: 'center',
            }}>
                <h2 style={{textAlign: "center", fontFamily: 'Kelly Slab, serif',}}>Пользователи</h2>

            </div>
            <div style={{
                marginBottom: '30px',
                padding: '10px',
                borderRadius: '15px',
                fontFamily: 'Kelly Slab, serif',
                backgroundColor: '#D9D9D9',
                marginTop: '30px',
                width: '80%',
                alignItems: 'center',
            }}>
                <p>Скала</p>
                <p>Дима</p>
                <p>Гебс</p>
                <p>Федя</p>
                <p>Володя</p>
                <p>Коротков</p>


                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
            <button style={{

                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: '30px',
                width: '25%',
                height:'75px',
                fontFamily: 'Kelly Slab, serif',
                padding: '10px',
                backgroundColor: 'darkolivegreen',
                color: 'black',
                border: 'none',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize: '40px',

            }}>
                Играть
            </button>

        </div>
    );
};

export default PageLobby;