import { ComponentProps, ReactNode } from 'react';
import { wrapLink } from 'src/utils/hoc';
import { UnionToObjectKeys } from 'src/utils/types/utils';
// import Loading from '../Loading/Loading';

interface Props {
    color?: 'primary' | 'red' | 'white' | 'gray' | 'none',
    variant?: 'fill' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    children: ReactNode;
    href?: string;
    fullWidth?: boolean;
    onClick?: () => void;
    className?: string
    isLoading?: boolean;
    disableOnLoading?: boolean;
    [rest: string]: any;
}

const btnStylesFill: UnionToObjectKeys<Props, 'color'> = {
    none: "",
    primary: "bg-primary-500 border-0 hover:bg-primary-400 active:bg-primary-600 text-white",
    gray: 'bg-gray-100 hover:bg-gray-200 text-gray-900 active:bg-gray-300',
    white: 'text-gray-900 bg-gray-25 hover:bg-gray-50',
    red: "bg-red-600 border-0 hover:bg-red-500 active:bg-red-700 text-white",
}

const btnStylesOutline: UnionToObjectKeys<Props, 'color'> = {
    none: "",
    primary: "text-primary-600",
    gray: 'text-gray-700',
    white: 'text-gray-900',
    red: "text-red-500",
}

const baseBtnStyles: UnionToObjectKeys<Props, 'variant'> = {
    fill: " shadow-sm active:scale-95",
    outline: "bg-gray-900 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-10 border border-gray-200 active:scale-95 "
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

export default function Button({ color = 'white', variant = 'fill', isLoading, disableOnLoading = true, size = 'md', fullWidth, href, className, onClick, children, ...props }: Props) {

    let classes = `
    inline-block font-sans rounded-lg font-regular border border-gray-300 hover:cursor-pointer
    ${baseBtnStyles[variant]}
    ${btnPadding[size]}
    ${variant === 'fill' ? btnStylesFill[color] : btnStylesOutline[color]}
    ${isLoading && disableOnLoading && 'bg-opacity-70 pointer-events-none'}
    `;

    if (size === 'md') classes += ' py-12 px-24';
    if (size === 'lg')
        if (fullWidth) classes += ' w-full'

    const handleClick = () => {
        if (isLoading && disableOnLoading) return;
        if (onClick) onClick();
    }


    return (
        wrapLink(
            <button
                type='button'
                className={`${classes} ${className}`}
                onClick={() => handleClick()}
                {...props}
            >
                {/* {isLoading ? <Loading color={loadingColor[color]} /> : children} */}
                {children}
            </button>
            , href)
    )
}
