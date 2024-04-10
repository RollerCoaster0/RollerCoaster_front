import React from 'react';
import './creategame.css'
import StageTabs from "./tabs/StageTabs";
import Locations from "./locations/Locations";

const CreateGamePage = () => {
    return (
        <>
            <main className='create-game-container'>
                <StageTabs/>
                <Locations/>
            </main>
        </>
    );
};

export default CreateGamePage;