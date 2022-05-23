import { useEffect, useRef } from "react";

export const useAutoResizableTextArea = () => {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        function OnInput() {
            if (ref.current) {
                ref.current.style.height = "auto";
                ref.current.style.height = (ref.current.scrollHeight) + "px";
            }
        }
        ref.current?.setAttribute("style", "height:" + (ref.current?.scrollHeight) + "px;overflow-y:hidden;");
        ref.current?.addEventListener("input", OnInput, false);

    }, [])

    return ref

}