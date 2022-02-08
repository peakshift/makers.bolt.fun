import { Link } from "react-router-dom";


export function wrapLink(Component: JSX.Element, href: string | undefined, options: { className?: string, newTab?: boolean } = {}) {
    if (!href) return Component;

    if (options.newTab)
        return <a
            href={href}
            className={options.className}
            target="_blank" rel="noopener noreferrer" >
            {Component}
        </a>

    return <Link
        to={href}
        className={options.className} >
        {Component}
    </Link>
}