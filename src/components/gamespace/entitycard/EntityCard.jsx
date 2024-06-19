import React, {useContext, useRef} from 'react';
import {Avatar, LinearProgress, Paper} from "@mui/material";
import rock from '../../../devassets/the_rock.jpg'
import {GameContext} from "../../../contexts/GameContext";

const EntityCard = () => {
    const value = 60
    const max = 100
    const parentRef = useRef()
    const name = 'Name'
    const {pickedEntity} = useContext(GameContext)
    if (!pickedEntity) {
        return null
    }
    return (
        <Paper sx={backStyle}>
            <div className='entity-card-hp-wrapper' ref={parentRef}>
                <div className='entity-card-hp-bar' style={{width: pickedEntity?.entity.healthPoints / max * parentRef?.current?.offsetWidth}}>
                    <span style={{marginLeft: 15, marginTop: 5}}>
                    HP:
                    </span>
                    <span style={{marginLeft: 45, marginTop: 5}}>
                        {pickedEntity?.entity.healthPoints}
                    </span>
                </div>
                <div className="entity-name-avatar">
                    <Avatar alt={name} sx={{width: '50px', height: '50px'}} src={pickedEntity?.entity.avatar}/>
                    <div className='entity-name'><p>{pickedEntity?.entity.name}</p></div>
                </div>
                {pickedEntity?.type === 'player'
                    ? <div className='entity-name' style={{marginTop: 30}}>
                        {pickedEntity?.entity.characterClass.name}
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
                        <div>Skill <span className='entity-skill-description-start'>Description...</span></div>
                        <div>Skill <span className='entity-skill-description-start'>Description...</span></div>
                        <div>Skill <span className='entity-skill-description-start'>Description...</span></div>
                        <div>Skill <span className='entity-skill-description-start'>Description...</span></div>
                    </div>
                </Paper>
            </div>

        </Paper>);
};

const healts = {
    width: '90%', height: '40px'
}

const backStyle = {
    width: '100%', height: '100%', padding: '5%',
}

export default EntityCard;