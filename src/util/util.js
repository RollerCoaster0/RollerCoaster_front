import redAvatar from "../devassets/red_player.png";
import greenAvatar from "../devassets/green_player.png";
import background from "../devassets/grid.png"
import map from '../devassets/location_map.jpg'
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import locationMap from "../devassets/location_map.jpg";
import React from "react";

export const devConsts = {
    defaultCellSize: 100,
    api: 'http://localhost:5050',
    tokenKey: 'RollerCoasterToken',
    userKey: 'RollerCoasterUser'
};


export function getStaticField() {
    const fieldData = [];
    for (let i = 0; i < 8; i++) fieldData.push([0, 0, 0, 0, 0, 0, 0, 0]);
    fieldData[0][0] = 1;
    fieldData[2][3] = 2;
    return fieldData;
}

export function getStaticCharacters() {
    const characters = [{id: 1, avatar: redAvatar, attributes: null, position: {x: 0, y: 0}}];
    const ownedCharacters = [{id: 2, avatar: greenAvatar, attributes: null, position: {x: 2, y: 3}}];
    return [characters, ownedCharacters];
}

export function getStaticFieldParams() {
    return {
        fieldSize: [8, 8],
        cellSize: devConsts.defaultCellSize,
        background: background
    };
}

export function getStaticLocations() {
    return [{
        name: 'Location 1',
        description: 'descr',
        map: map
    },
        {
            name: 'Location 2',
            description: 'descr',
            map: map
        }, {
            name: 'Location 3',
            description: 'descr',
            map: map
        },];
}