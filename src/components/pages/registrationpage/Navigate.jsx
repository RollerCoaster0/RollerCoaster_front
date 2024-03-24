import React from 'react';
import {Link} from "react-router-dom";
import './styles.css'

const Navigate = () => {
    return (
        <div>
            <button className="button"><Link className="link-button" to="/Authentication"> I have an account</Link></button>
        </div>
    );
};

export default Navigate;