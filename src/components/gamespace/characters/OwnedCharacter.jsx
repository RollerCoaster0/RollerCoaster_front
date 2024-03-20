import React from 'react';

const OwnedCharacter = ({gameFieldContext, avatar, attributes, position}) => {
    console.log(avatar)
    return (
        <div className="owned-character"
             style={{
                 left: position.x * gameFieldContext.cellSize,
                 top: position.y * gameFieldContext.cellSize,
                 width: gameFieldContext.cellSize,
                 height: gameFieldContext.cellSize,
                 padding: gameFieldContext.cellSize * 0.1
             }}>
            <img src={avatar} style={{width: gameFieldContext.cellSize * 0.8, height: gameFieldContext.cellSize * 0.8}}
                 alt={'aboba'}/>

        </div>
    );
};

export default OwnedCharacter;