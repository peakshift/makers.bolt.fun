
import Select, { StylesConfig } from "react-select";


type Props<T extends object | string> = {
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

} &
    (
        {

            isMulti: true
            onChange?: (values: T[] | null) => void
            value?: T[] | null
        }
        |
        {

            isMulti?: false
            onChange?: (values: T | null) => void
            value?: T | null
        }
    )



const colourStyles: StylesConfig = {
    input: (styles, state) => ({
        ...styles,
        " input": {
            boxShadow: 'none !important'
        }
    }),
};

export default function AutoComplete<T extends object>({
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
    ...props

}: Props<T>) {


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


