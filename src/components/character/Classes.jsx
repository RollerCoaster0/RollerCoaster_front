import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getCredentials} from "../../contexts/UserContext";
import {devConsts} from "../../util/util";


const Classes = () => {


    const handleChange = (event) => {

    };
    const slasses = ["boba", "ssss", "bambuk"]


    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 120, backgroundColor: "rgba(102,157,6,0.54)"}} size="small">
                <InputLabel id="demo-select-small-label">Class</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={characterClass}
                    label="Class"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                    </MenuItem>

            {slasses && slasses?.map(item =>
                <MenuItem value={10}><h1 className="Class_Selecter">
                    {item}
                </h1></MenuItem>
            )}


                </Select>
            </FormControl>
        </div>

    );
}
export default Classes;
