import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "src/utils/routing";

interface Props {
  isPreview?: boolean;
}

export default function PostActions({ isPreview }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-32">
      <button
        className={`
            hidden lg:flex w-full aspect-square bg-white rounded-12 border-2 border-gray-200 justify-around items-center text-gray-500 hover:bg-gray-50 active:bg-gray-100
            `}
        onClick={() =>
          isPreview ? navigate(-1) : navigate(PAGES_ROUTES.blog.feed)
        }
      >
        <FiArrowLeft className={"text-body1"} />
      </button>
    </div>
  );
}
