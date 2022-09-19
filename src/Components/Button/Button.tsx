import React, { ReactNode } from 'react';
import { UnionToObjectKeys } from 'src/utils/types/utils';
import { Link } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner';

type Props = {
    color?: 'primary' | 'red' | 'white' | 'gray' | "black" | 'none',
    variant?: 'fill' | 'outline' | 'text'
    size?: 'sm' | 'md' | 'lg'
    children: ReactNode;
    href?: string;
    newTab?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
    className?: string
    loadingText?: string
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
    red: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
}

const loadingColor: UnionToObjectKeys<Props, 'color'> = {
    none: "#101828",
    primary: "#ffffff",
    gray: '#101828',
    white: '#101828',
    black: '#ffffff',
    red: "#ffffff",
}

const btnStylesOutline: UnionToObjectKeys<Props, 'color'> = {
    none: "",
    primary: "text-primary-600",
    gray: 'text-gray-600',
    white: 'text-gray-900',
    black: 'text-black',
    red: "text-red-500",
}

const baseBtnStyles: UnionToObjectKeys<Props, 'variant'> = {
    fill: "transition-transform active:scale-95",
    outline: "transition-transform bg-gray-900 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-10 border border-gray-200 active:scale-95 ",
    text: "transition-transform active:scale-95 hover:bg-gray-100 active:bg-gray-50"
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
    size = 'md',
    fullWidth,
    disabled,
    href,
    newTab,
    className,
    onClick,
    loadingText,
    isLoading,
    disableOnLoading = true,
    children,
    ...props }, ref) => {

    let classes = `
    inline-block font-sans rounded-lg font-regular hover:cursor-pointer text-center relative
    ${baseBtnStyles[variant]}
    ${btnPadding[size]}
    ${variant === 'fill' ? btnStylesFill[color] : btnStylesOutline[color]}
    ${isLoading && disableOnLoading && 'bg-opacity-70 pointer-events-none'}
    ${fullWidth && 'w-full'}
    ${disabled && 'opacity-90 pointer-events-none'}
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
        <span className={isLoading ? "opacity-0" : ""}>
            {children}
        </span>
        {isLoading && <div className="text-body5 absolute inset-0 rounded-lg bg-inherit flex flex-col justify-center items-center">
            {loadingText ?? <TailSpin
                width="24"
                color={loadingColor[color]}
                height="24"
            />}
        </div>}
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