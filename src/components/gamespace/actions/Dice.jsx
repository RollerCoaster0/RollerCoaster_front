import React, {useContext, useRef, useState} from 'react';
import '../gamespace.css'
import CasinoIcon from '@mui/icons-material/Casino';
import {sendRoll, sendRollByNpc} from "../../../api/game";
import {GameContext} from "../../../contexts/GameContext";
import {Menu, MenuItem, Modal, Tooltip} from "@mui/material";
import {UserContext} from "../../../contexts/UserContext";

const diceStateValue = {
    IDLE: 0,
    PICK_DIE: 1,
    WAITING_FOR_RESULT: 2,
    GOT_RESULT: 3,
}

const Dice = () => {
    const [diceState, setDiceState] = useState(diceStateValue.IDLE)
    const {currentPlayerId, pickedEntity, isGm} = useContext(GameContext)
    const diceRes = useRef(null)
    const anchorRef = useRef()
    const handleRoll = async (die) => {
        setDiceState(diceStateValue.WAITING_FOR_RESULT)
        let response
        if (!isGm) {
            response = await sendRoll(currentPlayerId.current, die)
        } else {
            response = await sendRollByNpc(pickedEntity.entity.id, die)
        }
        if (!response.ok) {
            //proccess
        } else {
            diceRes.current = await response.json()
            setDiceState(diceStateValue.GOT_RESULT)
            setTimeout(() => setDiceState(diceStateValue.IDLE), 1000)
        }
    }
    const menuOnClose = () => {
        setDiceState(diceStateValue.IDLE)
    }
    console.log(pickedEntity, isGm)
    return (
        <>
            <Tooltip title='Roll dice'>
                <div onClick={() => setDiceState(diceStateValue.PICK_DIE)} ref={anchorRef}>
                    <CasinoIcon sx={dieIconStyle}/>
                </div>
            </Tooltip>
            <Menu onClose={menuOnClose} open={diceState === diceStateValue.PICK_DIE} anchorEl={anchorRef.current}
                  transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                  }}>
                {isGm && pickedEntity?.type !== 'npc' ? <MenuItem>Pick an NPC</MenuItem>
                    : <>
                        <MenuItem onClick={() => handleRoll(4)}>4D</MenuItem>
                        <MenuItem onClick={() => handleRoll(6)}>6D</MenuItem>
                        <MenuItem onClick={() => handleRoll(10)}>10D</MenuItem>
                    </>
                }
            </Menu>
            <Modal open={diceState > diceStateValue.PICK_DIE}>
                <div>
                    {diceState === diceStateValue.WAITING_FOR_RESULT ?
                        <p>animating</p>
                        : <p className='game-field__side-panel__dice__result'>{diceRes?.current?.result}</p>}
                </div>
            </Modal>
        </>
    );
};

const dieIconStyle = {
    width: '60px',
    height: '60px',
    zIndex: 1000,
    transition: 'transform 0.2s ease',
    color: 'white',
    '&:hover': {
        transform: 'scale(1.3, 1.3)',
    }
}
export default Dice;