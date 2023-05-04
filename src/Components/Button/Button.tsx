import React, { ReactNode } from "react";
import { UnionToObjectKeys } from "src/utils/types/utils";
import { TailSpin } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";
import LinkDuo from "../LinkDuo/LinkDuo";

type Props = {
  color?: "primary" | "secondary" | "red" | "white" | "gray" | "black" | "none";
  variant?: "fill" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
  newTab?: boolean;
  fullWidth?: boolean;
  className?: string;
  loadingText?: string;
  isLoading?: boolean;
  disableOnLoading?: boolean;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

const btnStylesFill: UnionToObjectKeys<Props, "color"> = {
  none: "",
  primary:
    "bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white",
  secondary: "border-2 border-primary-300 bg-primary-100 hover:bg-primary-100 text-primary-900 active:bg-primary-300",
  gray: "bg-gray-100 hover:bg-gray-200 text-gray-900 active:bg-gray-300",
  white: "border-2 border-gray-300 text-gray-900 bg-gray-25 hover:bg-gray-50",
  black: "text-white bg-black hover:bg-gray-900",
  red: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
};

const loadingColor: UnionToObjectKeys<Props, "color"> = {
  none: "#101828",
  primary: "#ffffff",
  secondary: "#ffffff",
  gray: "#101828",
  white: "#101828",
  black: "#ffffff",
  red: "#ffffff",
};

const btnStylesOutline: UnionToObjectKeys<Props, "color"> = {
  none: "",
  primary: "text-primary-600",
  secondary: "text-primary-600",
  gray: "text-gray-600",
  white: "text-gray-900",
  black: "text-black",
  red: "text-red-500",
};

const baseBtnStyles: UnionToObjectKeys<Props, "variant"> = {
  fill: "transition-transform active:scale-95",
  outline:
    "transition-transform bg-gray-900 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-10 border-2 border-gray-200 active:scale-95 ",
  text: "transition-transform active:scale-95 hover:bg-gray-100 active:bg-gray-50",
};

// const loadingColor: UnionToObjectKeys<Props, 'color', ComponentProps<typeof Loading>['color']> = {
//     none: "white",
//     primary: "white",
//     gray: 'primary',
//     white: 'primary',
//     red: "white"
// } as const;

const btnPadding: UnionToObjectKeys<Props, "size"> = {
  sm: "py-8 px-12 text-body5",
  md: "py-12 px-24 text-body4",
  lg: "py-12 px-36 text-body4",
};

const Button = React.forwardRef<any, Props>(
  (
    {
      color = "white",
      variant = "fill",
      size = "md",
      fullWidth,
      disabled,
      href,
      newTab,
      className,
      loadingText,
      isLoading,
      disableOnLoading = true,
      children,
      ...props
    },
    ref
  ) => {
    let classes = `
    inline-block font-sans rounded-lg font-regular hover:cursor-pointer text-center relative
    ${baseBtnStyles[variant]}
    ${btnPadding[size]}
    ${variant === "fill" ? btnStylesFill[color] : btnStylesOutline[color]}
    ${isLoading && disableOnLoading && "bg-opacity-70 pointer-events-none"}
    ${fullWidth && "w-full"}
    ${disabled && "opacity-80 pointer-events-none"}
    `;

    const onClick = props.onClick;

    const handleClick = (e: any) => {
      if (isLoading && disableOnLoading) return;

      if (onClick) onClick(e);
    };

    const btnContent = (
      <>
        <span className={isLoading ? "opacity-0" : ""}>{children}</span>
        {isLoading && (
          <div className="text-body5 absolute inset-0 rounded-lg bg-inherit flex flex-col justify-center items-center">
            {loadingText ?? (
              <TailSpin width="24" color={loadingColor[color]} height="24" />
            )}
          </div>
        )}
      </>
    );

    if (href)
      return (
        <LinkDuo
          to={href}
          className={twMerge(
            classes,
            disabled && "opacity-75 pointer-events-none",
            className
          )}
          target={newTab ? "_blank" : "_self"}
          rel="noopener noreferrer"
          onClick={(e) => handleClick(e)}
        >
          {btnContent}
        </LinkDuo>
      );

    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(classes, className)}
        onClick={(e) => handleClick(e)}
        disabled={disabled}
        {...props}
      >
        {btnContent}
      </button>
    );
  }
);

export default Button;
