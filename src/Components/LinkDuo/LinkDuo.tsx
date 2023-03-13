import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"a">;

export default function LinkDuo({ to, children, ...props }: Props) {
  // It is a simple element with nothing to link to
  if (!to) return <span {...props}>{children}</span>;

  // It is intended to be an external link
  if (/^https?:\/\//.test(to))
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );

  // Finally, it is an internal link
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
