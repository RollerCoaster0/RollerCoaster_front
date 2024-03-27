import {useEffect, useState} from "react";
import {getStaticFieldParams} from "../util/util";

export function useFieldParams(id) {
    //static yet
    const [params, setParams] = useState(null);
    useEffect(() => {
        const p = getStaticFieldParams();
        setParams(p);
    }, []);
    return params;
}