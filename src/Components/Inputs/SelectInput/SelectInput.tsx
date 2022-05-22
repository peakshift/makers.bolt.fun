import { ChangeEvent } from "react";
import { ThreeDots } from "react-loader-spinner";
import './selectinput.style.css'

interface Props {
    options?: {
        value: number | string | undefined,
        label: string
    }[]
    classes?: {
        containerClasses?: string,
        inputClasses?: string
    };
    valueAsNumber?: boolean;
    defaultValue?: number | string,
    placeholder?: string;
    value?: number | string,
    isLoading?: boolean;
    onChange?: (newValue: string) => void
    onBlur?: () => void
    [key: string]: any
}

export default function SelectInput({ options = [], classes, defaultValue, value, isLoading, onChange, onBlur, placeholder, ...props }: Props) {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = props.valueAsNumber ? Number(e.target.value) : e.target.value;
        onChange?.(value as any);
    }


    return (
        <div className={`selectdiv relative  ${classes?.containerClasses}`}>
            <select className={`
                    block
                    w-full 
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-primary-700 focus:ring focus:ring-primary-600 focus:ring-opacity-50
                    cursor-pointer
                   ${classes?.inputClasses}
                   `}
                disabled={isLoading}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                defaultValue={defaultValue}
                {...props}
            >
                {placeholder && <option value="" className="py-12">{placeholder}</option>}
                {options.map(o => <option key={o.value} value={o.value} className="py-12">{o.label}</option>)}
            </select>

            {isLoading &&
                <div className="absolute top-1/2 -translate-y-1/2 right-48">
                    <ThreeDots width={40} />
                </div>
            }
        </div>

    )
}
