import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useNavigateBack } from "src/utils/hooks";
import { twMerge } from "tailwind-merge";

type Props = (
  | {
      defaultBackRoute: string;
    }
  | {
      backRoute: string;
    }
) &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({ className, onClick, ...props }: Props) {
  const defaultBackRoute = (props as any).defaultBackRoute;

  const useDirectNavigation = !!(props as any).backRoute;

  const navigate = useNavigate();
  const navigateBack = useNavigateBack(defaultBackRoute);

  return (
    <button
      className={twMerge(
        `
      w-48 aspect-square rounded self-center flex flex-col justify-center items-center gap-8 text-gray-900 bg-white hover:bg-gray-50 active:bg-gray-100 border-2 border-gray-200
       `,
        className
      )}
      onClick={(e) => {
        if (useDirectNavigation) navigate((props as any).backRoute);
        else navigateBack();
        onClick?.(e);
      }}
      {...props}
    >
      <FiArrowLeft />
    </button>
  );
}
