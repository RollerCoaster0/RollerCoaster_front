import {useEffect, useState} from "react";

export function useLongPolling(pollingUrl) {
    const [pollingData, setPollingData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(pollingUrl)
                if (response.status === 502) {
                    //TODO: handle error
                    fetchData()
                } else if (!response.ok) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    fetchData()
                } else {
                    const data = await response.json()
                    setPollingData(data)
                    fetchData()
                }
            } catch (e) {
                //TODO: handle error
                console.log('POLLING ERROR', e)
            }
        }
        fetchData()
    }, []);
    return pollingData
}