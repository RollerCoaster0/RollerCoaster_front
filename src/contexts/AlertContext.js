import {createContext, useState} from "react";

export const AlertContext  = createContext(undefined);


export const AlertContextProvider = ({children}) => {
    const [alertMessage, setAlertMessage] = useState('')
    const showAlert = (message, time) => {
        setAlertMessage(message)
        setTimeout(() => setAlertMessage(''), time)
    }
    return <AlertContext.Provider value={{alertMessage, showAlert}} >
        {children}
    </AlertContext.Provider>
}