import React from 'react';
import avatar from "./img/img.png"
const ImgList = ({number}) =>

    (
    <ul style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "280px",
        alignItems: "end",
        listStyle: "none",
        left:"0"

    }}>

        {number.map((number, index) => (
            <div className="message">
                <div className="message_field" key={index}>
                    <li style={{
                        maxWidth: "280px",
                        position: "relative",
                        left: "0"
                    }}>{number}</li>
                </div>
                <div>
                    <img className="message_field__avatar"
                         src={avatar} /*onClick={() => navigate('/')} style={{cursor: 'pointer'}*/ alt="avatar"/>
                </div>
            </div>
        ))}
    </ul>
);

export default ImgList;