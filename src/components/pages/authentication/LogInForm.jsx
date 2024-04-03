import './loginform.css'
import React, {useContext, useRef, useState} from "react";
import {authResult, UserContext} from "../../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import Loader from "../../common/loader/Loader";
import AuthResultMessage from "./AuthResultMessage";

const LogInForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {user, logIn} = useContext(UserContext);
    const result = useRef(null);
    const redirect = useNavigate();

    const [isAccessibleToLogIn, setIsAccessibleToLogIn] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [authResultShown, setAuthResultShown] = useState(false);

    const showAuthResult = () => {
        setAuthResultShown(true);
        setTimeout(() => {
            setAuthResultShown(false);
            if (result.current === authResult.OK) {
                redirect('/');
            } else {
                setAuthResultShown(false);
                setIsAccessibleToLogIn(true);
                setPassword('');
            }
        }, 2000);
    }
    const onLogin = async () => {
        setIsAccessibleToLogIn(false);
        setIsPending(true);

        result.current = await logIn(login, password);
        setIsPending(false);

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
                <Loader isActive={isPending}/>
                <button className="auth-button"
                        onClick={onLogin} disabled={!isAccessibleToLogIn}>логин
                </button>
                {authResultShown ? <AuthResultMessage result={result.current}/> : null}
            </div>
        </div>
    );
};

export default LogInForm;