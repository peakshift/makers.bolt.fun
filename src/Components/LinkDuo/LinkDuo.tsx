import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to?: string;
  children: React.ReactNode;
  newTab?: boolean;
  state?: Record<string, any>;
} & React.ComponentPropsWithoutRef<"a">;

export default function LinkDuo({
  to,
  children,
  newTab,
  state,
  ...props
}: Props) {
  // It is a simple element with nothing to link to
  if (!to) return <span {...props}>{children}</span>;

  // It is intended to be an external link
  if (/^https?:\/\//.test(to))
    return (
      <a
        href={to}
        target={newTab ? "_blank" : undefined}
        rel={"noopener noreferrer"}
        {...props}
      >
        {children}
      </a>
    );

  // Finally, it is an internal link
  return (
    <Link
      to={to}
      target={newTab ? "_blank" : undefined}
      rel={"noopener noreferrer"}
      state={state}
      {...props}
    >
      {children}
    </Link>
  );
}
