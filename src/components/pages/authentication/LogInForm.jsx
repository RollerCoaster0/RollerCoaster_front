import './loginform.css'
import React, {useContext, useRef, useState} from "react";
import {UserContext} from "../../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import Loader from "../../common/loader/Loader";

const LogInForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {user, register, logIn} = useContext(UserContext);
    const authResult = useRef(null);
    const redirect = useNavigate();

    const [isAccessibleToLogIn, setIsAccessibleToLogIn] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [authResultShown, setAuthResultShown] = useState(false);
    const showAuthResult = () => {
        setAuthResultShown(true);
        setTimeout(() => {
            setAuthResultShown(false);
            if (authResult.current >= 200 && authResult.current < 300) {
                redirect('/');
            } else {
                setAuthResultShown(false);
                setIsAccessibleToLogIn(true);
            }
        }, 2000);
    }
    const onLogin = async () => {
        setIsAccessibleToLogIn(false);
        setIsPending(true);
        authResult.current = await logIn(login, password);
        setIsPending(false);
        showAuthResult();
    }
    console.log(isPending)
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
                {authResultShown ? <p style={{fontSize: 50}}>{authResult.current}</p> : null}
            </div>
        </div>
    );
};

export default LogInForm;