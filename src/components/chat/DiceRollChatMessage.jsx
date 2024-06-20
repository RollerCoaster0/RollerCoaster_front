import React from 'react';
const DiceRollChatMessage = ({result}) => {
    return (
        <>
            <span style={{fontSize: 20}}>
                Rolled a {`D${result?.die} with ${result.result} result`}
            </span>
        </>
    );
};

export default DiceRollChatMessage;