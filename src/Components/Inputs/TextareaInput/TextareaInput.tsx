import React from "react";

type Props = {
    isError?: boolean;
    className?: string;
    inputClass?: string
} & React.ComponentPropsWithoutRef<'textarea'>

export default React.forwardRef<HTMLTextAreaElement, Props>(function TextareaInput({ className, inputClass, isError, ...props }, ref) {

    return (
        <div className={`
        relative w-full border bg-white rounded-12 flex 
        focus-within:ring focus-within:ring-opacity-50
        ${isError ?
                "border-red-300 focus-within:border-red-300 focus-within:outline-red-400 focus-within:ring-red-200"
                :
                "border-gray-300 focus-within:border-primary-300 focus-within:outline-primary-400 focus-within:ring-primary-200"}
        ${className}`}>
            <textarea
                className={`input-text ${inputClass}`}
                ref={ref}
                {...props}
            />
        </div>
    )
})
