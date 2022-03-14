import { Link } from 'react-router-dom'
import { UnionToObjectKeys } from 'src/utils/types/utils'

interface Props {
    onClick?: () => void;
    href?: string;
    children: JSX.Element
    className?: string
    size?: "sm" | 'md' | 'lg'
    variant?: 'blank' | 'fill'
}


const sizeToPadding: {
    [Key in NonNullable<Props['size']>]: string
} = {
    sm: 'p-8',
    md: 'p-12',
    lg: 'p-16'
}

const baseBtnStyles: UnionToObjectKeys<Props, 'variant'> = {
    fill: " shadow-sm active:scale-95",
    blank: "bg-gray-900 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-10 active:scale-95 !border-0"
}

export default function IconButton({ href, size = "md", className = "", children, onClick = () => { }, variant = 'blank' }: Props) {


    if (href)
        return (
            <Link
                to={href}
                className={`
                ${sizeToPadding[size]} 
                ${baseBtnStyles[variant]} 
                inline-block active:scale-95 rounded-full ${className}`}
                style={{ lineHeight: 0 }}
                onClick={onClick}
            >
                {children}
            </Link>
        )

    return (
        <button
            type='button'
            className={`
            ${sizeToPadding[size]} 
            ${baseBtnStyles[variant]} 
            active:scale-95 rounded-full ${className}`}
            style={{ lineHeight: 0 }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
