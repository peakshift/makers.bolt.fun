import ReactDatePicker from "react-datepicker";
import { MdCalendarToday } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    value?: Date,
    onChange?: (newValue: Date | null) => void
    classes?: {
        containerClasses?: string,
        inputClasses?: string
    };
    className?: string
    innerClassname?: string
}

export default function DatePicker({ value = new Date(), onChange = () => { }, classes, className }: Props) {
    return (
        <div className={`input-wrapper !text-gray-800 px-16
         ${className} ${classes?.containerClasses}`}>
            <MdCalendarToday className="flex-shrink-0 self-center text-gray-600" />
            <ReactDatePicker
                selected={value}
                onChange={onChange}
                className={`
                    input-text
                    text-gray-800
                   ${classes?.inputClasses} `}
            ></ReactDatePicker>
        </div>
    )
}
