import {useEffect, useRef,} from "react";

export function useZoom(refEl, defaultSize, setCellSize, zoomFlag) {
    const zoomMultiplier = useRef(1)
    const applyZoom = (e) => {
        const delta = e.deltaY || e.detail || e.wheelDelta
        zoomMultiplier.current = Math.max(zoomMultiplier.current + 0.1 * Math.sign(delta), 0.5)
        zoomFlag.current = true
        setCellSize(defaultSize * zoomMultiplier.current)
        setTimeout(() => zoomFlag.current = false, 600)
        e.preventDefault()
    }

    useEffect(() => {
        refEl.current.addEventListener('wheel', applyZoom)
    }, []);

}