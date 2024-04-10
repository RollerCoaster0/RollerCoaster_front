import React from 'react';
import '../../creategame.css'
import addIcon from '../../../../../devassets/add.svg'
const AddLocationButton = ({handler}) => {
    return (
       <button  className='add-location-button'>
           <img src={addIcon} style={{width: '100%'}} alt='x'/>
       </button>
    );
};

export default AddLocationButton;