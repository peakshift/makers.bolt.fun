import { ReactNode } from 'react';
import { Link } from 'react-router-dom'

interface Props {
    color?: 'primary' | 'white' | 'gray'
    size?: 'md' | 'lg'
    children: ReactNode;
    href?: string;
    fullWidth?: boolean;
    onClick?: () => void;
    className?: string
}

export default function Button(props: Props) {
    let classes = "btn inline-block";

    if (props.color === 'primary') classes += ' btn-primary';
    else if (props.color === 'gray') classes += ' btn-gray';

    if (props.size === 'md') classes += ' py-12 px-24';

    if (props.fullWidth) classes += ' w-full'

    const handleClick = () => {
        if (props.onClick) props.onClick();
    }

    return (
        props.href ? <Link to={props.href} className={`${classes} ${props.className}`} onClick={handleClick}>{props.children}</Link> : <button className={`${classes} ${props.className}`} onClick={handleClick}>{props.children}</button>

    )
}
