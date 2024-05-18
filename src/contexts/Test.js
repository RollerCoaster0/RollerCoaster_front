import {createContext, useState} from "react";

export const TestContext = createContext(undefined)

export const TestContextProvider = ({children}) => {
    const [s, setS] = useState()
   const obj = {
        s,
   }
}
