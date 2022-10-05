import React, { ReactElement, ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"
import { RootState } from "src/redux/store"

export type ModifyArgs = Partial<{
    store: Partial<RootState>, router: {
        routePath: string,
        currentPath: string
    }
}>



export function WrapFormController<K extends string, V extends any>(key: K, defaultValue: V) {

    const Func = (Story: ReactElement) => {
        const { control } = useForm({
            defaultValues: {
                [key]: defaultValue as any
            }
        })
        return <Controller
            control={control}
            name={key}
            render={({ field: { onChange, value, onBlur } }) => {
                console.log(value);
                return React.cloneElement(Story, { value, onChange, onBlur })
                // <Story
                //     value={value}
                //     onChange={onChange}
                //     onBlur={onBlur}
                // />
            }}
        />
    }

    return Func;

}
