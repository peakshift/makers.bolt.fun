import { useEffect } from "react";
import _throttle from "lodash.throttle";

export const useResizeListener = (
  listener: () => void,
  depsArray: any[] = [],
  options: { throttleValue?: number } = {}
) => {
  options.throttleValue = options.throttleValue ?? 250;
  useEffect(() => {
    const func = _throttle(listener, 250);
    func();

    window.addEventListener("resize", func);
    return () => {
      window.removeEventListener("resize", func);
    };
  }, [listener]);
};
