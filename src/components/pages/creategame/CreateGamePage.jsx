import React, {useRef, useState} from 'react';
import './creategame.css'
import StageTabs from "./tabs/StageTabs";
import Locations from "./locations/locationslist/Locations";
import Items from "./items/Items";
import Quests from "./quests/Quests";
import NPCs from "./NPCs/NPCs";


const CreateGamePage = () => {
    const [gameInfo, setGameInfo] = useState({
        name: 'test', description: 'test'
    });
    const [locations, setLocations] = useState([]);
    const [items, setItems] = useState([]);
    const [quests, setQuests] = useState([]);
    const [npcs, setNPCs] = useState([]);
    const itemIdCounter = useRef(0);
    const locationIdCounter = useRef(0);
    const questIdCounter = useRef(0);

    const stages = [
        {
            name: 'Locations',
            form: <Locations key={'Locations'} locations={locations} setLocations={setLocations} idCounter={locationIdCounter}/>,
            current: useCurrent(true)
        },
        {
            name: 'Items',
            form: <Items key={'Items'} items={items} setItems={setItems} idCounter={itemIdCounter}/>,
            current: useCurrent(false)
        },
        {
            name: 'Quests',
            form: <Quests key={'Quests'} setQuests={setQuests} quests={quests} idCounter={questIdCounter}/>,
            current: useCurrent(false)
        },
        {
            name: 'NPCs',
            form: <NPCs/>,
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