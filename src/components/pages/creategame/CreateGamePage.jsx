import React, {useState} from 'react';
import './creategame.css'
import StageTabs from "./tabs/StageTabs";
import Locations from "./locations/locationslist/Locations";
import {getStaticLocations} from "../../../util/util";

const CreateGamePage = () => {
    const [gameInfo, setGameInfo] = useState({
        name: 'test', description: 'test'
    });
    const [locations, setLocations] = useState(getStaticLocations());
    const [items, setItems] = useState([]);
    const [npcs, setNPCs] = useState([]);
    return (
        <main className='create-game-container'>
            <StageTabs/>
            <Locations locations={locations} setLocations={setLocations}/>
        </main>
    );
};

export default CreateGamePage;