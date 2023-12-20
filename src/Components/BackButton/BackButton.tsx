import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigateBack } from "src/utils/hooks";
import { twMerge } from "tailwind-merge";

type Props = {
  defaultBackRoute: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({ className, onClick, ...props }: Props) {
  const navigateBack = useNavigateBack(props.defaultBackRoute);

  return (
    <button
      className={twMerge(
        `
      w-48 aspect-square rounded self-center flex flex-col justify-center items-center gap-8 text-gray-900 bg-white hover:bg-gray-50 active:bg-gray-100 border-2 border-gray-200
       `,
        className
      )}
      onClick={(e) => {
        navigateBack();
        onClick?.(e);
      }}
      {...props}
    >
      <FiArrowLeft />
    </button>
  );
}
