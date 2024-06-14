import React from 'react';
const DiceRollChatMessage = ({result}) => {
    return (
        <>
            <span style={{fontSize: 26}}>
                Rolled a {`D${result?.die}`} dice
            </span>
        </>
    );
};

export default DiceRollChatMessage;