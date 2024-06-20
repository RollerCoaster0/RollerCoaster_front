import React, {useContext, useRef, useState} from 'react';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import {GameContext} from "../../../contexts/GameContext";
import {Menu, MenuItem, Tooltip} from "@mui/material";
import ChangeHPItem from "./ChangeHPItem";

const HealthPoints = () => {
    const {players, npcs} = useContext(GameContext)
    const anchor = useRef()
    const [menuOpen, setMenuOpen] = useState(false)
    console.log('NPCS', npcs)
    return (
        <>
            <Tooltip title='Change Health Points'>
                <div ref={anchor}>
                    <HeartBrokenIcon sx={iconStyle} onClick={() => setMenuOpen(true)}/>
                </div>
            </Tooltip>
            <Menu sx={{paddingTop: '40px'}} open={menuOpen} anchorEl={anchor.current} onClose={() => setMenuOpen(false)}
                  PaperProps={{
                      style: {
                          maxHeight: '300px',
                      },
                  }} transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}>
                <MenuItem sx={itemStyle}><p>Players</p></MenuItem>
                {players.map(p => <ChangeHPItem entity={p} type={'player'}/>)}
                <MenuItem sx={itemStyle}><p>NPC</p></MenuItem>
                {npcs.map(n => <ChangeHPItem entity={n}/>)}
            </Menu>
        </>
    );
};


const itemStyle = {
    width: '400px',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyItems: 'center',
    fontFamily: 'Kelly Slab, serif',
    fontSize: '25px'
}

const iconStyle = {
    width: '55px',
    height: '60px',
    zIndex: 1000,
    transition: 'transform 0.2s ease',
    color: 'white',
    '&:hover': {
        transform: 'scale(1.3, 1.3)',
    },

}

export default HealthPoints;