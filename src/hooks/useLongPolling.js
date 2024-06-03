import {useEffect, useState} from "react";
import {fetchEvent} from "../api/updates";

export function useLongPolling() {
    const [pollingData, setPollingData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('POLLING HAS STARTED')
                const response = await fetchEvent()
                if (response.status === 502) {
                    console.log('POLL ERR',response)
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
                console.log('RESUB')
                fetchData()
            }
        }
        fetchData()
    }, []);
    return pollingData
}