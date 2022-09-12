import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom'
import { UnionToObjectKeys } from 'src/utils/types/utils'

interface Props {
    onClick?: () => void;
    onKeyDown?: (v: any) => void
    href?: string;
    className?: string
    size?: "sm" | 'md' | 'lg'
    variant?: 'blank' | 'fill'
    isDisabled?: boolean
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

const IconButton = React.forwardRef<any, PropsWithChildren<Props>>(({
    href,
    size = "md",
    className = "",
    children,
    onClick = () => { },
    onKeyDown,
    variant = 'blank',
    isDisabled,
}, ref) => {

    if (href)
        return (
            <Link
                ref={ref}
                to={href}
                className={`
                ${sizeToPadding[size]} 
                ${baseBtnStyles[variant]} 
                inline-block active:scale-95 rounded-full ${className}`}
                style={{ lineHeight: 0 }}
                onClick={onClick}
                onKeyDown={onKeyDown}
            >
                {children}
            </Link>
        )

    return (
        <button
            ref={ref}
            type='button'
            className={`
            ${className}
            ${sizeToPadding[size]} 
            ${baseBtnStyles[variant]} 
            active:scale-95 rounded-full
            ${isDisabled && "opacity-60"}
             `}
            style={{ lineHeight: 0 }}
            onClick={onClick}
            onKeyDown={onKeyDown}
            disabled={isDisabled}
        >
            {children}
        </button>
    )
})

export default IconButton;