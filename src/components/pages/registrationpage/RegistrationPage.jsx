import './styles.css'
import Form from "./Form";
import Loading from "./Loading";
import React, {useState, useEffect} from 'react';

const RegistrationPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        isLoading
            ? <Loading/>
            : <main>
                <Form/>
            </main>

    );
};

export default RegistrationPage;