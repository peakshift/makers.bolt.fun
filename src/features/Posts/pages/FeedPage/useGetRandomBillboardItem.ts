import { useLayoutEffect, useRef, useState } from "react";

export const useGetRandomBillboardItem = <T>(
  data: T[],
  config?: Partial<{ intervalInSeconds: number }>
) => {
  const [billboard, setBillboard] = useState<T>(data[0]);

  const { intervalInSeconds = 90 } = config ?? {};

  const currentIdx = useRef(0);

  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      setBillboard(data[++currentIdx.current % data.length]);
    }, intervalInSeconds * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data, intervalInSeconds]);

  return billboard;
};
