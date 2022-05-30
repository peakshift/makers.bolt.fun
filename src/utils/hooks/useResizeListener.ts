import { useDebouncedCallback, useMountEffect } from "@react-hookz/web";

export const useResizeListener = (
  listener: () => void,
  options: { debounce?: number } = {}
) => {
  options.debounce = options.debounce ?? 250;

  const func = useDebouncedCallback(listener, [], options.debounce)
  useMountEffect(() => {
    window.addEventListener("resize", func);

    return () => {
      window.removeEventListener("resize", func);
    };
  });
};
