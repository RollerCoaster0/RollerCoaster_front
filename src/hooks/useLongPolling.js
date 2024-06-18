import {useEffect, useRef, useState} from "react";
import {fetchEvent, fetchInitEvent} from "../api/updates";

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


export function useLongPoll(flag) {
    const [pollingData, setPollingData] = useState(null)
    const deviceId = useRef()
    useEffect(() => {
        const getDeviceId = async () => {
            const response = await fetchInitEvent()
            if (!response.ok) {
                //TODO: handle
            } else {
                const data = await response.json()
                console.log('GETDEVICEID',data)
                setPollingData(data?.update)
                deviceId.current = data?.deviceId
            }
        }
        const subscribe = async () => {
            console.log('POLLING HAS STARTED')
            while (flag.current) {
                console.log('SUBSCRIBED')
                const response = await fetchEvent(deviceId.current)
                console.log('POLL HAPPENDED ', response)
                if (!response.ok) {
                    console.log('POLLING ERROR', response)
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    continue
                }
                const data = await response.json()
                console.log('SUBS DATA', data )
                setPollingData(data?.update)
            }
        }
        console.log('CALLED UE')
        getDeviceId()
            .then(subscribe)
    }, []);
    return pollingData
}