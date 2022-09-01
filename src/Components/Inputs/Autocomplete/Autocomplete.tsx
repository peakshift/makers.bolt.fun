
import { useMemo } from "react";
import Select, { StylesConfig } from "react-select";
import { ControlledStateHandler } from "src/utils/interfaces";


type Props<T extends object | string, IsMulti extends boolean = false> = {
    options: T[];
    labelField?: keyof T
    valueField?: keyof T
    placeholder?: string
    disabled?: boolean
    isLoading?: boolean;
    isClearable?: boolean;
    control?: any,
    name?: string,
    className?: string,
    onBlur?: () => void;
    size?: 'sm' | 'md' | 'lg'
} & ControlledStateHandler<T, IsMulti>




export default function AutoComplete<T extends object, IsMulti extends boolean>({
    options,
    labelField,
    valueField,
    placeholder = "Select Option...",
    isMulti,
    isClearable,
    disabled,
    className,
    value,
    onChange,
    onBlur,
    size = 'md',
    ...props
}: Props<T, IsMulti>) {


    const colourStyles: StylesConfig = useMemo(() => ({
        control: (styles, state) => ({
            ...styles,
            padding: '5px 12px',
            borderRadius: 12,
            // border: 'none',
            // boxShadow: 'none',

            ":hover": {
                cursor: "pointer"
            },
            ":focus-within": {
                '--tw-border-opacity': '1',
                borderColor: 'rgb(179 160 255 / var(--tw-border-opacity))',
                outlineColor: '#9E88FF',
                '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
                '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
                '--tw-ring-color': 'rgb(179 160 255 / var(--tw-ring-opacity))',
                '--tw-ring-opacity': '0.5'
            }
        }),
        indicatorSeparator: (styles, state) => ({
            ...styles,
            display: "none"
        }),
        input: (styles, state) => ({
            ...styles,
            " input": {
                boxShadow: 'none !important'
            },
        }),
    }), [])

    return (
        <div className='w-full'>
            <Select
                options={options}

                placeholder={placeholder}
                className={className}
                isMulti={isMulti}
                isClearable={isClearable}
                isLoading={props.isLoading}

                getOptionLabel={o => o[labelField]}
                getOptionValue={o => o[valueField]}

                value={value as any}
                onChange={v => onChange?.(v as any)}
                onBlur={onBlur}


                styles={colourStyles}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--primary)',
                    },
                })}
            />

        </div>

    );
}


