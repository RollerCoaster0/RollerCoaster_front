import React, {useContext, useRef} from 'react';
import {Avatar, Menu, MenuItem, Paper, Slide} from "@mui/material";
import {GameContext} from "../../../contexts/GameContext";
import skills from "../../pages/creategame/skills/Skills";

const EntityCard = () => {
    const max = 100
    const parentRef = useRef()
    const name = 'Name'
    const {shownEntity, skills} = useContext(GameContext)
    console.log('SHOWN ENTITY',shownEntity)
    return (
        <>
            <Slide direction={'up'} in={shownEntity} mountOnEnter >
                <Paper className='entity-card-container'>
                    <Paper sx={backStyle}>
                        <div className='entity-card-hp-wrapper' ref={parentRef}>
                            <div className='entity-card-hp-bar'
                                 style={{width: shownEntity?.entity.healthPoints / max * parentRef?.current?.offsetWidth}}>
                    <span style={{marginLeft: 15, marginTop: 5}}>
                    HP:
                    </span>
                                <span style={{marginLeft: 45, marginTop: 5}}>
                        {shownEntity?.entity.healthPoints ?? 100}
                    </span>
                            </div>
                            <div className="entity-name-avatar">
                                <Avatar alt={name} sx={{width: '50px', height: '50px'}}
                                        src={shownEntity?.entity.avatar}/>
                                <Paper sx={{backgroundColor: 'black', color: 'white', borderRadius: '15px'}} className='entity-name'><p>{shownEntity?.entity.name}</p></Paper>
                            </div>
                            {shownEntity?.type === 'player'
                                ? <div className='entity-name' style={{marginTop: 30}}>
                                    {shownEntity?.entity.characterClass.name}
                                </div>
                                : null}

                            <Paper sx={{
                                overflow: 'scroll',
                                width: '250px',
                                height: '230px',
                                padding: '5%', marginTop: '25px', color: 'white', backgroundColor: 'black'
                            }}>
                                Skills:
                                <div className='entity-skills-list'>
                                    {skills?.filter(s =>{
                                        if (!shownEntity) return false
                                        console.log(shownEntity, s, 'COMPARE')
                                        if (shownEntity.type === 'player') {
                                            return s.availableOnlyForCharacterClassId === shownEntity.entity.characterClass.id
                                        } else {
                                            return s.availableOnlyForNonPlayableCharacterId === shownEntity.entity.id
                                        }
                                    } ).map(s => <div style={{display: 'flex', alignItems: 'center'}}>{s.name}<div className='entity-skill-description-start'>{s.description}</div></div>)}
                                </div>
                            </Paper>
                        </div>

                    </Paper>
                </Paper>
            </Slide>
        </>
    );
};

const healts = {
    width: '90%', height: '40px'
}

const backStyle = {
    width: '100%', height: '100%', padding: '5%',
}

export default EntityCard;