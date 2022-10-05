import React from "react";

type Props = {
    isError?: boolean;
    className?: string;
    inputClass?: string;
    renderBefore?: () => JSX.Element
    renderAfter?: () => JSX.Element
} & React.ComponentPropsWithoutRef<'input'>

export default React.forwardRef<HTMLInputElement, Props>(function TextInput({ className, inputClass, isError, renderBefore, renderAfter, ...props }, ref) {

    return (
        <div className={`
        relative w-full border bg-white rounded-12 flex 
        focus-within:ring focus-within:ring-opacity-50
        ${isError ?
                "border-red-300 focus-within:border-red-300 focus-within:outline-red-400 focus-within:ring-red-200"
                :
                "border-gray-300 focus-within:border-primary-300 focus-within:outline-primary-400 focus-within:ring-primary-200"}
        ${className}`}>
            {renderBefore?.()}
            <input
                type='text'
                className={`input-text ${inputClass}`}
                ref={ref}
                {...props}
            />
            {renderAfter?.()}
        </div>
    )
})
