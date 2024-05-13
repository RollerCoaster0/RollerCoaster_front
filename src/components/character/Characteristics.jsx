import React from 'react';
import {useState} from "react";
import './character.css'
import {Button, TextField} from "@mui/material";

const Characteristics = () => {
    const [count, setCount] = useState(1);

    const increaseCount = () => {
        setCount(count + 1);
    };
    const decreaseCount = () => {
        setCount(count - 1)
    }

    const divElements = Array.from({length: count}, (v, i) => (
        <div key={i} className="character_div">


            <input className="characteristics_input"/>
            <TextField variant="outlined" color="success" type="number"
                       sx={{
                           width: "50px",
                           height: "1px",
                           scrollbarColor:"darkolivegreen",

                       }}
            ></TextField>
        </div>
    ));

    return (
        <div className="character_field__characteristics">
            {divElements}
            <Button onClick={increaseCount}
                    sx={{
                        backgroundColor: "darkolivegreen",
                        width: "50px",
                        height: "55px",
                        fontSize: "10px",
                        borderRadius: "90px"
                    }}

            >+</Button>

            <Button onClick={decreaseCount}
                    sx={{
                        backgroundColor: "red",
                        fontSize: "10px",
                        width: "50px",
                        height: "55px",
                        borderRadius: "500px"
                    }}
            >-</Button>

        </div>
    );
};

export default Characteristics;