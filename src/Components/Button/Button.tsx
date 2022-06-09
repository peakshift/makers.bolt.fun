import React, { ReactNode } from 'react';
import { UnionToObjectKeys } from 'src/utils/types/utils';
import { Link } from 'react-router-dom'
// import Loading from '../Loading/Loading';

type Props = {
    color?: 'primary' | 'red' | 'white' | 'gray' | "black" | 'none',
    variant?: 'fill' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    children: ReactNode;
    href?: string;
    newTab?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
    className?: string
    isLoading?: boolean;
    disableOnLoading?: boolean;
    disabled?: boolean;
} & React.ComponentPropsWithoutRef<'button'>

const btnStylesFill: UnionToObjectKeys<Props, 'color'> = {
    none: "",
    primary: "bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white",
    gray: 'bg-gray-100 hover:bg-gray-200 text-gray-900 active:bg-gray-300',
    white: 'border border-gray-300 text-gray-900 bg-gray-25 hover:bg-gray-50',
    black: 'text-white bg-black hover:bg-gray-900',
    red: "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white",
}

const btnStylesOutline: UnionToObjectKeys<Props, 'color'> = {
    none: "",
    primary: "text-primary-600",
    gray: 'text-gray-700',
    white: 'text-gray-900',
    black: 'text-black',
    red: "text-red-500",
}

const baseBtnStyles: UnionToObjectKeys<Props, 'variant'> = {
    fill: "transition-transform active:scale-95",
    outline: "transition-transform bg-gray-900 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-10 border border-gray-200 active:scale-95 "
}


// const loadingColor: UnionToObjectKeys<Props, 'color', ComponentProps<typeof Loading>['color']> = {
//     none: "white",
//     primary: "white",
//     gray: 'primary',
//     white: 'primary',
//     red: "white"
// } as const;

const btnPadding: UnionToObjectKeys<Props, 'size'> = {
    sm: "py-8 px-12 text-body5",
    md: "py-12 px-24 text-body4",
    lg: 'py-12 px-36 text-body4'
}

const Button = React.forwardRef<any, Props>(({ color = 'white',
    variant = 'fill',
    isLoading,
    disableOnLoading = true,
    size = 'md',
    fullWidth,
    disabled,
    href,
    newTab,
    className,
    onClick,
    children,
    ...props }, ref) => {

    let classes = `
    inline-block font-sans rounded-lg font-regular hover:cursor-pointer text-center
    ${baseBtnStyles[variant]}
    ${btnPadding[size]}
    ${variant === 'fill' ? btnStylesFill[color] : btnStylesOutline[color]}
    ${isLoading && disableOnLoading && 'bg-opacity-70 pointer-events-none'}
    ${fullWidth && 'w-full'}
    ${disabled && 'opacity-40 pointer-events-none'}
    `;



    const handleClick = () => {
        if (isLoading && disableOnLoading) return;

        if (onClick) onClick();
    }

    const btn = <button
        ref={ref}
        type='button'
        className={`${classes} ${className}`}
        onClick={() => handleClick()}
        disabled={disabled}
        {...props}
    >
        {/* {isLoading ? <Loading color={loadingColor[color]} /> : children} */}
        {children}
    </button>;

    if (href && newTab) return <a href={href} target='_blank' rel="noopener noreferrer">
        {btn}
    </a>

    if (href) return <Link to={href}>
        {btn}
    </Link>

    return btn

})

export default Button;