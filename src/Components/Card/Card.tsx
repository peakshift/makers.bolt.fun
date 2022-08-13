
import React, { PropsWithChildren } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    onlyMd?: boolean;
    defaultPadding?: boolean

}

const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({
    onlyMd = false,
    defaultPadding = true,
    className,
    ...props
}, ref) => {


    return (
        <div
            {...props}
            ref={ref}
            className={`
            ${onlyMd ?
                    `md:bg-white md:rounded-16 md:border-2 border-gray-200 ${defaultPadding && "md:p-24"}` :
                    `bg-white rounded-12 md:rounded-16 border-2 border-gray-200 ${defaultPadding && "p-16 md:p-24"}`
                }
            ${className}
            `}
        ></div>
    )
})

export default Card;