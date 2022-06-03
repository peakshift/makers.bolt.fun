
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
            padding: size === 'md' ? '1px 4px' : '8px 12px',
            borderRadius: size === 'md' ? 8 : 12,
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
    }), [size])

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


