import React, {useState} from 'react';//поле Реги
import './style.css'

const PasswordCheck = () => {
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
        <><main>
        <div className="register-form-container">
            <h1 className="form-title">RollerCoaster</h1>
            <div className="form-fields">
                <input type="text" placeholder="Имя/nickname"/><br/>
                    <input type="password" placeholder="Password" value={password}
                           onChange={handlePasswordChange}/><br/>
                    <input type="password" placeholder="Повторите Password" value={confirmPassword}
                           onChange={handleConfirmPasswordChange}/>
                    {match === true ? <span>&#10004;</span> : match === false ? <span>&#10060;</span> : null}
            </div>
        </div>
        </main>
            </>
    );
}

export default PasswordCheck;
