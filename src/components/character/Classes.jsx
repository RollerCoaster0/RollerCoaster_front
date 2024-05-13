import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Characteristics from "./Characteristics";


const Classes = () => {
    const [characterClass, setClass] = React.useState('');

    const handleChange = (event) => {
        setClass(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 120, backgroundColor:"rgba(102,157,6,0.54)"}} size="small">
                <InputLabel id="demo-select-small-label">Class</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={characterClass}
                    label="Class"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem value={10}>Elf</MenuItem>
                    <MenuItem value={20}>Dwarf</MenuItem>
                    <MenuItem value={30}>Human</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};
export default Classes;