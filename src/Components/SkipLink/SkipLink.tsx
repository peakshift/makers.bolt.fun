import { PropsWithChildren } from "react";
import Portal from "../Portal/Portal";

interface Props {
  id?: string;
}

export default function SkipLink({
  id,
  children = "Skip to content",
}: PropsWithChildren<Props>) {
  if (!id) return null;

  return (
    <Portal id="skip-links">
      <a
        href={`#${id}`}
        className={`bg-primary-500 text-white p-16 text-body3 fixed top-0 left-4 -translate-y-full focus:translate-y-0 z-[3000]`}
      >
        {children}
      </a>
    </Portal>
  );
}
