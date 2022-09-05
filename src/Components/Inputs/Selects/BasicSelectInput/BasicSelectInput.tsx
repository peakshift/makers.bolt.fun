
import { useCallback } from "react";
import Select, { OnChangeValue, StylesConfig, components, OptionProps } from "react-select";
import { ControlledStateHandler } from "src/utils/interfaces";



type Props<T extends Record<string, any>, IsMulti extends boolean = boolean> = {
    options: T[];
    labelField: keyof T
    valueField: keyof T
    placeholder?: string
    disabled?: boolean
    isLoading?: boolean;
    isClearable?: boolean;
    control?: any,
    name?: string,
    className?: string,
    renderOption?: (option: OptionProps<T>) => JSX.Element
} & ControlledStateHandler<T, IsMulti>






export const selectCustomStyle: StylesConfig = ({
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
    menu: (styles, state) => ({
        ...styles,
        padding: 8,
        borderRadius: "16px !important"
    }),
})



export default function BasicSelectInput<T extends Record<string, any>, IsMulti extends boolean>({
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
    renderOption,
    ...props
}: Props<T, IsMulti>) {




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
                components={{
                    Option: getOptionComponent(renderOption, labelField),
                    // ValueContainer: CustomValueContainer
                }}

                styles={selectCustomStyle as any}
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

function getOptionComponent<T extends Record<string, any>>(renderOption: Props<T>['renderOption'], labelField: Props<T>['labelField']) {
    const _render = renderOption ?? ((option) => <div
        className={`
    flex gap-16 my-4 px-16 py-12 rounded-12 text-gray-800 cursor-pointer
     ${!(option.isSelected || option.isFocused) ?
                "hover:bg-gray-50"
                :
                option.isSelected ? "bg-gray-100 text-gray-800" : "bg-gray-50"
            }
     `}>
        {option.data[labelField]}
    </div>)

    return function OptionComponent(props: OptionProps<T>) {
        return (
            <components.Option {...props} className='!p-0 !bg-transparent hover:!bg-transparent'>
                {_render(props)}
            </components.Option>
        );
    };
}