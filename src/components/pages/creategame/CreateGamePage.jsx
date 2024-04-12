import React, {useRef, useState} from 'react';
import './creategame.css'
import StageTabs from "./tabs/StageTabs";
import Locations from "./locations/locationslist/Locations";
import {getStaticLocations} from "../../../util/util";
import Items from "./items/Items";


const CreateGamePage = () => {
    const [gameInfo, setGameInfo] = useState({
        name: 'test', description: 'test'
    });
    const [locations, setLocations] = useState(getStaticLocations());
    const [items, setItems] = useState([]);
    const [npcs, setNPCs] = useState([]);


    const stages = [
        {
            name: 'Locations',
            form: <Locations locations={locations} setLocations={setLocations}/>,
            current: useCurrent(true)
        },
        {
            name: 'Items',
            form: <Items items={items} setItems={setItems}/>,
            current: useCurrent(false)
        },
        {
            name: 'Quests',
            form: null,
            current: useCurrent(false)
        },
        {
            name: 'NPCs',
            form: null,
            current: useCurrent(false)
        },
    ];
    return (
        <main className='create-game-container'>
            <StageTabs stages={stages}/>
            {stages.map(stage => stage.current.isCurrent ? stage.form : null)}
        </main>
    );
};

function useCurrent(flag) {
    const [isCurrent, setIsCurrent] = useState(flag);
    return {
        isCurrent, setIsCurrent
    }
}

export default CreateGamePage;