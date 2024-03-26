import './styles.css'
import Form from "./Form";
import Loading from "./Loading";
import React, {useState, useEffect} from 'react';
import Navbar from "../../common/navbar/Navbar";

const RegistrationPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
            <main>
                <Form></Form>
            </main>
        </>
    );
};

export default RegistrationPage;