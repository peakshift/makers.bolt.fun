import { useCallback, useEffect } from "react";
import _throttle from "lodash.throttle";

export const useResizeListener = (
  listener: () => void,
  depsArray: any[] = [],
  options: { throttleValue?: number } = {}
) => {
  options.throttleValue = options.throttleValue ?? 250;
  const cb = useCallback(listener, depsArray);
  useEffect(() => {
    const func = _throttle(cb, 250);
    func();

    window.addEventListener("resize", func);
    return () => {
      window.removeEventListener("resize", func);
    };
  }, [cb]);
};
