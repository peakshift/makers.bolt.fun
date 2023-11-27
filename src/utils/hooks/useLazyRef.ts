import { useRef } from "react";

export const useLazyRef = <T>(init: () => T) => {
  const ref = useRef<T>(null!);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref;
};
