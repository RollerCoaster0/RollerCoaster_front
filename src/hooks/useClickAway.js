import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

export function useClickAway(callback) {
    const wrapper = createPortal(<div style={{height: '100vh', width: '100%', zIndex: 500}}></div>, document.getElementById('root'));
}