import ReactDatePicker from "react-datepicker";
import { MdCalendarToday } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

interface Props {
  showTimeSelect?: boolean;
  value?: Date;
  onChange?: (newValue: Date | null) => void;
  classes?: {
    containerClasses?: string;
    inputClasses?: string;
  };
  className?: string;
  innerClassname?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      showTimeSelect = false,
      value = new Date(),
      onChange = () => {},
      classes,
      className,
    },
    ref
  ) => {
    return (
      <div
        className={`input-wrapper !text-gray-800 px-16
         ${className} ${classes?.containerClasses}`}
        ref={ref}
      >
        <MdCalendarToday className="flex-shrink-0 self-center text-gray-600" />
        <ReactDatePicker
          showTimeInput={showTimeSelect}
          selected={value}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={onChange}
          dateFormat={showTimeSelect ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy"}
          className={`
                    input-text
                    text-gray-800
                   ${classes?.inputClasses} `}
        ></ReactDatePicker>
      </div>
    );
  }
);

export default DatePicker;
