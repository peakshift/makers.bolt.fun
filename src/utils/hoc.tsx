import { Link } from "react-router-dom";


export function wrapLink(Component: JSX.Element, href: string | undefined, className?: string) {
    if (!href) return Component;

    return <Link to={href} className={className}>
        {Component}
    </Link>
}