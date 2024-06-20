import React, {useContext, useRef, useState} from 'react';
import '../authentication/loginform.css'
import {UserContext} from "../../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import AuthResultMessage from "../authentication/AuthResultMessage";

const regPhaseValue = {
    ACCESSIBLE_TO_REG: 0,
    PENDING: 1,
    RESULT_SHOWN: 2,
}

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [match, setMatch] = useState(null);
    const {register} = useContext(UserContext);
    const regResult = useRef(null);
    const redirect = useNavigate();
    const [regPhase, setRegPhase] = useState(regPhaseValue.ACCESSIBLE_TO_REG)

    const showRegistrationResult = () => {
        setRegPhase(regPhaseValue.RESULT_SHOWN)
        setTimeout(() => {
            setRegPhase(regPhaseValue.ACCESSIBLE_TO_REG)
            if (regResult.current >= 200 && regResult.current < 300) {
                redirect('/');
            }
        }, 2000);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setMatch(e.target.value === password);
    }

    const onRegister = async () => {
        setRegPhase(regPhaseValue.PENDING)
        regResult.current = await register(login, password);
        showRegistrationResult();
        handleClickNavigate();
    }

    const navigate = useNavigate();
    const handleClick = () => navigate('/authentication')
    const handleClickNavigate = () => navigate('/')

    return (
        <div className="auth-form-container">
            <h1 className="auth-form__form-title">RollerCoaster</h1>
            <div className="auth-form__form-fields">
                <input className='auth-input' type="text" placeholder="name" value={login}
                       onChange={e => setLogin(e.target.value)}/>
                <input className='auth-input' type="password" placeholder="Password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/><br/>
                <input className='auth-input' type="password" placeholder="Repeat Password" value={confirmPassword}
                       onChange={handleConfirmPasswordChange}/>
                {match === true ? <span>&#10004;</span> : match === false ? <span>&#10060;</span> : null}
            </div>
            <button className='auth-button' onClick={onRegister}
                    disabled={regPhase !== regPhaseValue.ACCESSIBLE_TO_REG}>Регистрация
            </button>
            <button className='auth-button' onClick={handleClick}>Логин
            </button>
            {regPhase === regPhase.PENDING ? <CircularProgress sx={{color: 'darkolivegreen'}}/> : null}
            {regPhase === regPhase.RESULT_SHOWN ? <AuthResultMessage result={regResult.current}/> : null}
        </div>
    );
};

export default RegistrationForm;