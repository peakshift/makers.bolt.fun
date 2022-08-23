import { useDebouncedCallback } from "@react-hookz/web";
import { useEffect } from "react";

export const useResizeListener = (
  listener: () => void,
  options: { debounce?: number } = {}
) => {
  options.debounce = options.debounce ?? 250;

  const func = useDebouncedCallback(listener, [listener], options.debounce)
  useEffect(() => {
    window.addEventListener("resize", func);

    return () => {
      window.removeEventListener("resize", func);
    };
  }, [func]);
};
