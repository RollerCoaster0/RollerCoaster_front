import './loginform.css'
import React, {useContext, useRef, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {queryResult, UserContext} from "../../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import AuthResultMessage from "./AuthResultMessage";


const logInPhaseValue = {
    ACCESSIBLE_TO_LOGIN: 0,
    PENDING: 1,
    RESULT_SHOWN: 2,
}

const LogInForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {logIn} = useContext(UserContext);
    const result = useRef(null)
    const redirect = useNavigate();
    const [loginPhase, setLoginPhase] = useState(logInPhaseValue.ACCESSIBLE_TO_LOGIN)

    const showAuthResult = () => {
        setTimeout(() => {
            setLoginPhase(logInPhaseValue.ACCESSIBLE_TO_LOGIN)
            if (result.current === queryResult.OK) {
                redirect('/')
            } else {
                setPassword('')
            }
        }, 2000)
    }

    const onLogin = async () => {
        setLoginPhase(logInPhaseValue.PENDING)
        result.current = await logIn(login, password);
        setLoginPhase(logInPhaseValue.RESULT_SHOWN)
        showAuthResult();
    }

    return (
        <div className='auth-form-wrapper'>
            <div className="auth-form-container">
                <h1 className="auth-form__form-title">RollerCoaster</h1>
                <div className="auth-form__form-fields">
                    <input className='auth-input' type="text" placeholder="name" value={login}
                           onChange={e => setLogin(e.target.value)}/>
                    <input className='auth-input' type="password" placeholder="password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className="auth-button"
                        onClick={onLogin} disabled={loginPhase !== logInPhaseValue.ACCESSIBLE_TO_LOGIN}>логин
                </button>
                {loginPhase === logInPhaseValue.PENDING ?  <CircularProgress sx={{color: 'darkolivegreen'}}/> : null}
                {loginPhase === logInPhaseValue.RESULT_SHOWN ? <AuthResultMessage result={result.current}/> : null}
            </div>
        </div>
    );
};

export default LogInForm;