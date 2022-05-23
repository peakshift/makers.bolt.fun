import { PropsWithChildren } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { wrapLink } from "src/utils/hoc";
import { UnionToObjectKeys } from "src/utils/types/utils";

interface Props {
    isLoading?: boolean;
    color?: 'primary' | 'gray' | 'none'
    size?: "sm" | 'md' | 'lg'
    shadow?: 'sm' | 'md' | 'lg' | 'none'
    className?: string;
    href?: string;
    onClick?: () => void
    onRemove?: () => void
}


const badgrColor: UnionToObjectKeys<Props, 'color'> = {
    none: '',
    primary: "bg-primary-600 border-0 text-white",
    gray: 'bg-gray-100 text-gray-900',
}

const badgeSize: UnionToObjectKeys<Props, 'size'> = {
    sm: "px-8 py-4 text-body6",
    md: "px-16 py-8 text-body4",
    lg: "px-24 py-12 text-body3"
}

const loadingBadgeSize: UnionToObjectKeys<Props, 'size'> = {
    sm: "w-48 h-[28px] text-body6",
    md: "w-64 h-[38px] text-body4",
    lg: "w-64 h-42  text-body3"
}


export default function Badge(
    {
        color = 'gray',
        size = 'md',
        className,
        href,
        shadow = 'none',
        children,
        isLoading,
        onRemove,
        onClick
    }
        : PropsWithChildren<Props>) {

    const classes = `
        rounded-48 border inline-block relative align-middle
        shadow-${shadow}
        ${badgrColor[color]}
        ${badgeSize[size]}
        ${className}
        ${(onClick || href) && 'cursor-pointer'}
        `

    if (isLoading)
        return <Skeleton width="7ch" className={`${loadingBadgeSize[size]} !rounded-48`} />



    return (
        wrapLink(
            <span className={classes} onClick={onClick}>
                <span className="font-medium">{children}</span>
                {onRemove && <IoMdCloseCircle onClick={onRemove} className="ml-12 cursor-pointer" />}
            </span>
            , href)
    )
}
