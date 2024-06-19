import React, {useContext, useRef} from 'react';
import {Avatar, Paper, Slide} from "@mui/material";
import {GameContext} from "../../../contexts/GameContext";

const EntityCard = () => {
    const value = 60
    const max = 100
    const parentRef = useRef()
    const name = 'Name'
    const {shownEntity} = useContext(GameContext)
    if (!shownEntity) {
        return null
    }
    return (
        <>
            <Slide direction={'up'} in={shownEntity} mountOnEnter >
                <div className='entity-card-container'>
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
                                <div className='entity-name'><p>{shownEntity?.entity.name}</p></div>
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
                                    <div>Skill <span className='entity-skill-description-start'>Description...</span>
                                    </div>
                                    <div>Skill <span className='entity-skill-description-start'>Description...</span>
                                    </div>
                                    <div>Skill <span className='entity-skill-description-start'>Description...</span>
                                    </div>
                                    <div>Skill <span className='entity-skill-description-start'>Description...</span>
                                    </div>
                                </div>
                            </Paper>
                        </div>

                    </Paper>
                </div>
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