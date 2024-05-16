import React, {useContext} from 'react'
import {GameContext} from "../../contexts/GameContext"
import Location from "./locations/Location";

const Game = () => {
     const {locations, currentLocation, characters} = useContext(GameContext)

    return (
        <>
            <Location location={currentLocation}
                      locationCharacters={characters.filter(c => c.locationId === currentLocation.id)}/>
        </>
    );
};

export default Game;