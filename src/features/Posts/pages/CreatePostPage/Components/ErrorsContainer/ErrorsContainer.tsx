import React, { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { IStoryFormInputs } from '../../CreateStoryPage/CreateStoryPage';

const ErrorsContainer = forwardRef<HTMLDivElement>((props, ref) => {

    const { formState: { isValid, isSubmitted, errors } } = useFormContext<IStoryFormInputs>();

    return (
        <div ref={ref}>
            {(!isValid && isSubmitted) && <ul className='bg-red-50 p-8 pl-24 border-l-4 rounded-8 border-red-600 list-disc text-body4 text-medium'>
                {errors.title && <li className="input-error text-body5 text-medium">
                    {errors.title.message}
                </li>}
                {errors.cover_image && <li className="input-error text-body5 text-medium">
                    {errors.cover_image.message}
                </li>}
                {errors.tags && <li className="input-error text-body5 text-medium">
                    {errors.tags.message}
                </li>}
                {errors.body && <li className="input-error text-body5 text-medium">
                    {errors.body.message}
                </li>}
            </ul>}
        </div>
    )
})

export default ErrorsContainer;