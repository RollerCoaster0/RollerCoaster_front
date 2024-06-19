import {useEffect, useRef,} from "react";

export function useZoom(refEl, defaultSize, setCellSize) {
    const zoomMultiplier = useRef(1)
    const applyZoom = (e) => {
        const delta = e.deltaY || e.detail || e.wheelDelta
        zoomMultiplier.current = Math.max(zoomMultiplier.current + 0.1 * Math.sign(delta), 0.5)
        setCellSize(defaultSize * zoomMultiplier.current)
        e.preventDefault()
    }

    useEffect(() => {
        refEl.current.addEventListener('wheel', applyZoom)
    }, []);

}