import _debounce from "lodash.debounce";
import { useEffect, useRef } from "react";

export const useReachedBottom = <T extends HTMLElement>(cb?: () => void, options: Partial<{ offset: number, throttle: number }> = {}) => {

    const { offset = window.innerHeight, throttle = 600 } = options

    const ref = useRef<T>(null);


    useEffect(() => {
        if (!cb) return;

        const cbDebounced = _debounce(cb, throttle)
        const listener = () => {
            if (!ref.current) return;
            const curWindowPosition = window.scrollY + window.innerHeight;
            const elTriggerPosition = ref.current.offsetTop + ref.current.scrollHeight - offset;
            if (curWindowPosition > elTriggerPosition) cbDebounced();
        }

        document.addEventListener('scroll', listener)

        return () => {
            document.removeEventListener('scroll', listener)
        }
    }, [cb, offset, throttle])

    return { ref }
}