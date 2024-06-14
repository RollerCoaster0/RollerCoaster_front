import React from 'react';
import './gamespace.css'
import CasinoIcon from '@mui/icons-material/Casino';

const Dice = () => {
    return (
        <>
            {/*<img className='game-field__side-panel__dice' src={diceSack}/>*/}
            <CasinoIcon sx={{
                width: '60px', height: '60px', zIndex: 1000, transition: 'transform 0.2s ease', color: 'white', '&:hover': {
                    transform: 'scale(1.3, 1.3)',
                }
            }}/>
        </>
    );
};

export default Dice;