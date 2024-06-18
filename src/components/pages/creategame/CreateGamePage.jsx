import React, {useRef, useState} from 'react';
import './creategame.css'
import StageTabs from "./tabs/StageTabs";
import Locations from "./locations/locationslist/Locations";
import Items from "./items/Items";
import Quests from "./quests/Quests";
import NPCs from "./NPCs/NPCs";
import PrevStageButton from "./buttons/PrevStageButton";
import NextStageButton from "./buttons/NextStageButton";
import GameDescription from "./description/GameDescription";
import CreateGame from "./create/CreateGame";
import Classes from "./classes/Classes";
import Skill from "./Skill";
import Skills from "./skills/Skills";


const CreateGamePage = () => {
    const [gameInfo, setGameInfo] = useState({
        name: '', description: '', preview: null
    });
    const [locations, setLocations] = useState([]);
    const [items, setItems] = useState([]);
    const [quests, setQuests] = useState([]);
    const [npcs, setNPCs] = useState([]);
    const [classes, setClasses] = useState([])
    const [skills, setSkills] = useState([])
    const itemIdCounter = useRef(0);
    const locationIdCounter = useRef(0);
    const questIdCounter = useRef(0);
    const npcIdCounter = useRef(0);
    const classTmpId = useRef(0);
    const skillTmpId = useRef(0);
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    
    const stages = [
        {
            name: 'Description',
            form: <GameDescription gameInfo={gameInfo} setGameInfo={setGameInfo}/>,
            current: useCurrent(true)
        },
        {
            name: 'Locations',
            form: <Locations key={'Locations'} locations={locations} setLocations={setLocations}
                             idCounter={locationIdCounter}/>,
            current: useCurrent(false)
        },
        {
            name: 'Classes',
            form: <Classes classes={classes} setClasses={setClasses} classTmpId={classTmpId}/>,
            current: useCurrent(false)
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
            form: <NPCs key={'NPCs'} NPCs={npcs} setNPCs={setNPCs} idCounter={npcIdCounter} locations={locations}/>,
            current: useCurrent(false)
        },
        {
            name: 'Skills',
            form: <Skills skills={skills} setSkills={setSkills} skillTmpId={skillTmpId} classes={classes} npcs={npcs}/>,
            current: useCurrent(false)

        },
        {
            name: 'Create',
            form: <CreateGame gameInfo={gameInfo} quests={quests} locations={locations} items={items} npcs={npcs} classes={classes} skills={skills}/>,
            current: useCurrent(false)
        },

    ];
    return (
        <div style={{width: 1500, margin: '0 auto'}}>
            <main className='create-game-container'>
                <StageTabs stages={stages} currentStageIndex={currentStageIndex}
                           setCurrentStageIndex={setCurrentStageIndex}/>
                {stages.map((stage, ind) => currentStageIndex === ind ? stage.form : null)}
            </main>
            <PrevStageButton setCurrentStageIndex={setCurrentStageIndex} currentStageIndex={currentStageIndex}/>
            <NextStageButton setCurrentStageIndex={setCurrentStageIndex} currentStageIndex={currentStageIndex}
                             numOfStages={stages.length}/>
        </div>
    );
};

function useCurrent(flag) {
    const [isCurrent, setIsCurrent] = useState(flag);
    return {
        isCurrent, setIsCurrent
    }
}

export default CreateGamePage;