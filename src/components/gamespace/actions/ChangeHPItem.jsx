import React, {useState} from 'react';
import '../gamespace.css'
import {Avatar, Button, ListItemIcon, MenuItem, Slider, Tooltip} from "@mui/material";
import {changeHpNpc, changeHpPlayer} from "../../../api/game";

const ChangeHpItem = ({entity, type}) => {
    const [value, setValue] = useState(entity?.healthPoints)
    const handleApply = async (hp) => {
        let response
        if (type === 'player') {
            response = await changeHpPlayer(entity.id, hp)
        } else {
            response = await changeHpNpc(entity.id, hp)
        }
        if (!response.ok) {
            //TODO: handle
        }
    }
    return (
        <MenuItem sx={itemStyle}>
            <ListItemIcon>
                <Tooltip title={entity.name}>
                    <Avatar sx={{marginRight: '40px'}} src={entity?.avatar}/>
                </Tooltip>
                <div>
                    {/*{value}*/}
                    <Slider valueLabelDisplay="auto" sx={slStyle} value={value}
                            onChange={(e, newValue) => setValue(newValue)}/>
                </div>
            </ListItemIcon>
            <Button onClick={() => handleApply(value)} sx={byttonStyle}>Apply </Button>
        </MenuItem>
    );
};

const byttonStyle = {
    width: '40px', height: '30px', backgroundColor: 'darkolivegreen',
    color: 'white',
    '&:hover': {
        backgroundColor: 'darkolivegreen',
    },
    borderRadius: '15px'
}

const itemStyle = {
    width: '400px',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px'
}

const slStyle = {
    width: '160px',
    marginLeft: '15px',
    '& .MuiSlider-track': {
        color: "darkolivegreen"
    },
    '& .MuiSlider-thumb': {
        color: "darkolivegreen"
    },
    '& .MuiSlider-rail': {
        color: "darkolivegreen"
    },
}

export default ChangeHpItem;