import { MutableRefObject, useEffect, useRef, useState } from "react";



function addEventListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
    element.addEventListener(type, listener, options);
    return () => element.removeEventListener(type, listener, options);
}

function setImmediate(callback: (...args: any[]) => void, ...args: any[]) {
    let cancelled = false;
    Promise.resolve().then(() => cancelled || callback(...args));
    return () => {
        cancelled = true;
    };
}

function noop() { }

function handleDragOver(ev: DragEvent) {
    ev.preventDefault();
    ev.dataTransfer!.dropEffect = 'copy';
}


export const useIsDraggingOnElement = (options?: Partial<{
    ref: MutableRefObject<HTMLElement>
}>) => {
    const listenersRef = useRef<any[]>([]);
    const [isDragging, setIsDragging] = useState(false);


    useEffect(() => {
        let count = 0;
        let cancelImmediate = noop;

        const element = options?.ref?.current ?? document as unknown as HTMLElement;

        listenersRef.current = [
            addEventListener(element, 'dragover', handleDragOver),
            addEventListener(element, 'dragenter', ev => {
                ev.preventDefault();

                if (count === 0) {
                    setIsDragging(true)
                }
                ++count;
            }),
            addEventListener(element, 'dragleave', ev => {
                ev.preventDefault();
                cancelImmediate = setImmediate(() => {
                    --count;
                    if (count === 0) {
                        setIsDragging(false)
                    }
                })

            }),
            addEventListener(element, 'drop', ev => {
                ev.preventDefault();
                cancelImmediate();
                if (count > 0) {
                    count = 0;
                    setIsDragging(false)
                }
            }),
        ]

        return () => {
            listenersRef.current.forEach(f => f());
        }
    }, [options?.ref])


    return isDragging
}