import React, {useContext, useRef, useState} from 'react';
import skillIcon from '../../../devassets/use.png'
import '../gamespace.css'
import {GameContext} from "../../../contexts/GameContext";
import {Menu, MenuItem, Modal} from "@mui/material";
import NotGmOnly from "../NotGmOnly";
import GMonly from "../GMonly";

const Skill = () => {
    const {skills, game, currentPlayerId, pickedEntity} = useContext(GameContext)
    const anchor = useRef()
    const [menuOpen, setMenuOpen] = useState(false)
    const handleUseSkill = (s) => {

    }
    const handleUseSkillByNpc = (s) => {

    }
    console.log('skills', skills)
    console.log(game)
    return (
        <>
            <img ref={anchor} title='Use skill' className='game-field__side-panel__dice' src={skillIcon}
                 onClick={() => setMenuOpen(true)}/>
            <Menu anchorEl={anchor.current} open={menuOpen} onClose={() => setMenuOpen(false)}>

                <NotGmOnly>
                    {skills?.filter(s => s.availableOnlyForCharacterClassId === currentPlayerId.current).map(s =>
                        <MenuItem
                            onClick={() => handleUseSkill(s)}>{s.name}</MenuItem>)}
                </NotGmOnly>

                <GMonly>
                    {pickedEntity?.type !== 'npc' ? <MenuItem>Pick an
                        NPC</MenuItem> : skills?.filter(s => s.availableOnlyForNonPlayableCharacterId === pickedEntity.entity.id).map(s =>
                        <MenuItem
                            onClick={() => handleUseSkillByNpc(s)}>{s.name}</MenuItem>)}
                </GMonly>

            </Menu>
        </>
    );
};

export default Skill;