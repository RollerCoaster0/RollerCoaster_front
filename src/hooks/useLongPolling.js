import {useEffect, useState} from "react";
import {fetchEvent} from "../api/updates";

export function useLongPolling() {
    const [pollingData, setPollingData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('POLLING HAS STARTED')
                const response = await fetchEvent()
                console.log('POLL HAPPENDED ', response)
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


export async function useLongPoll(flag) {
    const [pollingData, setPollingData] = useState(null)
    useEffect(() => {
        const subscribe = async () => {
            while (flag.current) {
                const response = await fetchEvent()
                if (!response.ok) {
                    console.log('POLLING ERROR', response)
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue
                }
                setPollingData(await response.json())
            }
        }
        subscribe()
    }, []);
    return pollingData
}