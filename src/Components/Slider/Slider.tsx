import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { useResizeListener } from "src/utils/hooks";

interface Props {
  gap?: number;
}

export default function Slider({
  gap = 12,
  children,
}: PropsWithChildren<Props>) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const containerRef = useRef<HTMLDivElement>(null!);
  const sliderRef = useRef<HTMLDivElement>(null!);
  const [sliderWidth, setSliderWidth] = useState(-1);

  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    {
      bounds: () => ({ left: -sliderWidth, right: 0, top: 0, bottom: 0 }),
      rubberband: [0.15, 0],
      filterTaps: true,
    }
  );

  const resizeListener = useCallback(() => {
    setSliderWidth(
      Math.max(
        sliderRef.current?.scrollWidth - containerRef.current?.clientWidth,
        0
      )
    );
  }, [setSliderWidth]);

  useResizeListener(resizeListener);

  useEffect(() => {
    setSliderWidth(
      Math.max(
        sliderRef.current?.scrollWidth - containerRef.current?.clientWidth,
        0
      )
    );
  }, [setSliderWidth]);

  return (
    <>
      <div
        className="w-full relative "
        ref={containerRef}
        style={{ height: sliderRef.current?.scrollHeight + "px" }}
      >
        <animated.div
          {...bind()}
          style={{ x, y, touchAction: "none", gap: `${gap}px` }}
          className={`absolute top-0 left-0 flex w-max select-none`}
          ref={sliderRef}
        >
          {children}
        </animated.div>
      </div>
    </>
  );
}
