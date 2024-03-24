import React, {useState} from 'react';
import './styles.css'
import Button from "./Button";

const Form = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [match, setMatch] = useState(null);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value === password) {
            setMatch(true);
        } else {
            setMatch(false);
        }
    }
    return (
        <>
            <div className="register-form-container">
                <h1 className="form-title">RollerCoaster</h1>
                <div className="form-fields">
                    <div className="form-field">
                        <input type="text" placeholder="NickName"/>
                    </div>
                    <div className="form-field">
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/><br/>
                        <input type="password" placeholder="Repeat Password" value={confirmPassword}
                               onChange={handleConfirmPasswordChange}/>
                        {match === true ? <span>&#10004;</span> : match === false ? <span>&#10060;</span> : null}
                    </div>
                    <div className="form-field">
                        <input type="text" placeholder="Email"/>
                    </div>
                </div>
                <Button></Button>
            </div>
        </>
    );
};

export default Form;