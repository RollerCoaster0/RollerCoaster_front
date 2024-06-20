import React, {useContext, useRef, useState} from 'react';
import skillIcon from '../../../devassets/use.png'
import '../gamespace.css'
import {GameContext} from "../../../contexts/GameContext";
import {Menu, MenuItem, Modal, Tooltip} from "@mui/material";
import NotGmOnly from "../NotGmOnly";
import GMonly from "../GMonly";
import {sendUseSkill, sendUseSkillByNPC, useSkillByNPC} from "../../../api/game";
import {UserContext} from "../../../contexts/UserContext";

const Skill = () => {
    const {skills, game, currentPlayerId, pickedEntity, players} = useContext(GameContext)
    const {user} = useContext(UserContext)
    const anchor = useRef()
    const [menuOpen, setMenuOpen] = useState(false)
    const handleUseSkill = async (s) => {
        const response = await sendUseSkill(s.id, currentPlayerId.current)
        if (!response.ok) {
            //TODO: handle
        }
    }
    const handleUseSkillByNpc = async (s) => {
        const response = await sendUseSkillByNPC(s.id, pickedEntity.entity.id)
    }
    return (
        <>
            <Tooltip title='Use skill'>
                <img ref={anchor} className='game-field__side-panel__dice' src={skillIcon}
                     onClick={() => setMenuOpen(true)}/>
            </Tooltip>
            <Menu anchorEl={anchor.current} open={menuOpen} onClose={() => setMenuOpen(false)} transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}>

                <NotGmOnly>
                    {skills?.filter(s => {
                        const currentPlayer = players.find(p => p.userId === user.id)
                        return s.availableOnlyForCharacterClassId === currentPlayer?.characterClass.id
                    }).map(s =>
                        <MenuItem
                            onClick={() => handleUseSkill(s)}>{s.name}</MenuItem>)}
                </NotGmOnly>

                <GMonly>
                    {pickedEntity?.type !== 'npc' ? <MenuItem>Pick an
                        NPC</MenuItem> : skills?.filter(s => s.availableOnlyForNonPlayableCharacterId === pickedEntity?.entity?.npcId).map(s =>
                        <MenuItem
                            onClick={() => handleUseSkillByNpc(s)}>{s.name}</MenuItem>)}
                </GMonly>

            </Menu>
        </>
    );
};

export default Skill;