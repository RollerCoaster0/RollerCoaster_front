import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Characteristics from "./Characteristics";
import Character from "../gamespace/characters/Character";
import {getCredentials} from "../../contexts/UserContext";
import {devConsts} from "../../util/util";
import {render} from "react-dom";


const Classes = ({classes}) => {


    const [characterClass, setClass] = React.useState('');

    const handleChange = (event) => {
        setClass(event.target.value);
    };
    const [Class, setClasses] = useState();
    useEffect(() => {
            async function initClasses() {
                let Id = 2;
                const token_game = getCredentials()?.token;
                console.log(token_game)
                let class_response = await fetch(devConsts.api + '/games/' + Id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${token_game}`,
                    }
                })
                let class_data = class_response.json();
                setClasses(await class_data);
            }
            initClasses().then(r => console.log(Class));
        },
        []);


        return (
            <div>
                <FormControl sx={{m: 1, minWidth: 120, backgroundColor: "rgba(102,157,6,0.54)"}} size="small">
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
                        <MenuItem value={10}><h1 className="Class_Selecter">
                            {Class?.classes[0].name}
                        </h1></MenuItem>

                        <MenuItem value={10}><h1 className="Class_Selecter">
                            {Class?.classes[1].name}
                        </h1></MenuItem>

                        {/*{classes.map(c => <MenuItem>{c.description}</MenuItem>)}*/}
                    </Select>
                </FormControl>
            </div>

        );
}
export default Classes;
