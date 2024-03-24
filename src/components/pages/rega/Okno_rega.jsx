import React, {useState} from 'react';//поле Реги

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
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div>
                <input type="text" placeholder="Имя/nickname"/><br/>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/><br/>
                <input type="password" placeholder="Повторите Password" value={confirmPassword}
                       onChange={handleConfirmPasswordChange}/>
                {match === true ? <span>&#10004;</span> : match === false ? <span>&#10060;</span> : null}
            </div>
        </div>
    );
}

export default PasswordCheck;
// smddkvd