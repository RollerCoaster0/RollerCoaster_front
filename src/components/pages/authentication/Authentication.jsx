import React, {useEffect, useState} from 'react';//поле Реги
import './style.css'
import Loading from "../registrationpage/Loading";
import FormA from "./FormA";
import Navbar from "../../common/navbar/Navbar";


const PasswordCheck = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <Loading/>;
    }


    return (
        <>
            <Navbar/>
            <FormA></FormA>
            </>
    );
}

export default PasswordCheck;
