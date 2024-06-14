import redAvatar from "../devassets/red_player.png";
import background from "../devassets/grid.png"
import d4img from '../devassets/dices/d4dice.webp'

export const devConsts = {
    defaultCellSize: 100,
    api: 'http://localhost:5050',
    tokenKey: 'RollerCoasterToken',
    userKey: 'RollerCoasterUser',
    minio: 'http://localhost:7070'
}


export function getStaticField() {
    const fieldData = [];
    for (let i = 0; i < 8; i++) fieldData.push([0, 0, 0, 0, 0, 0, 0, 0]);
    fieldData[0][0] = 1;
    fieldData[2][3] = 2;
    return fieldData;
}

export function getStaticPlayers() {
    const characters = [{id: 1, avatar: redAvatar, attributes: null, pos: {x: 0, y: 0}, locationId: 0}]
    return characters
}

// export function getStaticFieldParams() {
//     return {
//         location:
//         fieldSize: [8, 8],
//         cellSize: devConsts.defaultCellSize,
//         background: background
//     };
// }


export function getStaticLocations() {
   return [{
       id: 0,
       name: 'loc',
       description: '',
       background: background,
       size: [8, 8]
    }]
}


export const dices = new Map([
])


function createGame() {
   const game = {name: 'gametest', description: 'd'}
    const skills = [{}]
}