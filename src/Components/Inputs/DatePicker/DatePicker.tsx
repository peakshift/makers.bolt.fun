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
        <div className={`relative border flex gap-10 rounded-8 text-gray-600  py-10 px-14
         focus-within:outline-primary 
         ${className} ${classes?.containerClasses}`}>
            <MdCalendarToday className="flex-shrink-0 self-center" />
            <ReactDatePicker
                selected={value}
                onChange={onChange}
                className={`
                    block
                    w-full
                    rounded-md
                    border-gray-300 
                    bg-transparent
                    cursor-pointer
                   focus-visible:outline-none
                   text-gray-800
                   ${classes?.inputClasses} `}
            ></ReactDatePicker>
        </div>
    )
}
