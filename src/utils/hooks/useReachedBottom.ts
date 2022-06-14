import _debounce from "lodash.debounce";
import { useEffect, useRef } from "react";

export const useReachedBottom = <T extends HTMLElement>(cb?: () => void, options: Partial<{ offset: number, throttle: number }> = {}) => {

    const { offset = window.innerHeight * 2, throttle = 600 } = options

    const ref = useRef<T>(null);
    const callbackHandler = useRef<Function>();

    useEffect(() => {
        if (!cb)
            callbackHandler.current = undefined;
        else {
            callbackHandler.current = _debounce(cb, throttle)
        }
    }, [cb, throttle])


    useEffect(() => {
        const listener = () => {
            if (!ref.current) return;
            const curWindowPosition = window.scrollY + window.innerHeight;
            const elTriggerPosition = ref.current.offsetTop + ref.current.scrollHeight - offset;
            if (curWindowPosition > elTriggerPosition) callbackHandler.current?.();
        }
        document.addEventListener('scroll', listener)

        return () => {
            document.removeEventListener('scroll', listener)
        }
    }, [offset, throttle])

    return { ref }
}