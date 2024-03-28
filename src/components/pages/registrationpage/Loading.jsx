import './styles.css'
import logo from './Imagine/dragon1.mp4'
import './styles.css'
import React, {useEffect} from "react";

function Loading() {

    useEffect(() => {
        const video = document.getElementById('background-video');
        video.play();
    }, []);

    return (
        <>
            <video id="background-video" autoPlay loop muted className="gif">
                <source src={logo} type="video/mp4"/>
            </video>
        </>
    );
}

export default Loading;