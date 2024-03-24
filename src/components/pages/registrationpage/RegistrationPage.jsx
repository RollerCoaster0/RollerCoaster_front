import './styles.css'
import Form from "./Form";
import Loading from "./Loading";
import React, { useState, useEffect } from 'react';

const RegistrationPage = () => {
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
            <main>
                <Form></Form>
            </main>
        </>
    );
};

export default RegistrationPage;