import React, {useContext, useRef, useState} from 'react';
import '../authentication/loginform.css'
import {UserContext} from "../../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import Loader from "../../common/loader/Loader";

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [match, setMatch] = useState(null);
    const {user, register} = useContext(UserContext);
    const regResult = useRef(null);
    const redirect = useNavigate();

    const [isAccessibleToRegister, setIsAccessibleToRegister] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [authResultShown, setAuthResultShown] = useState(false);

    const showRegistrationResult = () => {
        setAuthResultShown(true);
        setTimeout(() => {
            setAuthResultShown(false);
            if (regResult.current >= 200 && regResult.current < 300) {
                redirect('/');
            } else {
                setAuthResultShown(false);
                setIsAccessibleToRegister(true);
            }
        }, 2000);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setMatch(e.target.value === password);
    }

    const onRegister = async () => {
        setIsAccessibleToRegister(false);
        setIsPending(true);
        regResult.current = await register(login, password);
        setIsPending(false);
        showRegistrationResult();
    }

    return (
        <div className="auth-form-container">
            <h1 className="auth-form__form-title">RollerCoaster</h1>
            <div className="auth-form__form-fields">
                <input className='auth-input' type="text" placeholder="name" value={login} onChange={e => setLogin(e.target.value)}/>
                <input className='auth-input' type="password" placeholder="Password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/><br/>
                <input className='auth-input' type="password" placeholder="Repeat Password" value={confirmPassword}
                       onChange={handleConfirmPasswordChange}/>
                {match === true ? <span>&#10004;</span> : match === false ? <span>&#10060;</span> : null}
            </div>
            <Loader isActive={isPending}/>
            <button className='auth-button' onClick={onRegister} disabled={!isAccessibleToRegister}>Регистрация</button>
            {isPending ? <p style={{fontSize: 50}}>Pending...</p> : null}
            {authResultShown ? <p style={{fontSize: 50}}>{regResult.current}</p> : null}
        </div>
    );
};

export default RegistrationForm;