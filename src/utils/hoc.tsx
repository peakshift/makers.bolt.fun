import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export function wrapLink(
  Component: JSX.Element,
  href: string | undefined,
  options: { className?: string; newTab?: boolean } = {}
) {
  if (!href) return Component;

  if (options.newTab)
    return (
      <a
        href={href}
        className={options.className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {Component}
      </a>
    );

  return (
    <Link to={href} className={options.className}>
      {Component}
    </Link>
  );
}

export function withProviders(
  ...providers: (
    | ((props: PropsWithChildren<{}>) => JSX.Element)
    | [provider: (props: any) => JSX.Element, providerProps?: any]
  )[]
) {
  return <ComponentProps extends Record<string, any>>(
      WrappedComponent: (props: ComponentProps) => JSX.Element | null
    ) =>
    (props: ComponentProps) =>
      providers.reduceRight((acc, prov) => {
        if (Array.isArray(prov)) {
          const Provider = prov[0];
          return <Provider {...prov[1]}>{acc}</Provider>;
        }

        const Provider = prov;
        return <Provider>{acc}</Provider>;
      }, <WrappedComponent {...props} />);
}
