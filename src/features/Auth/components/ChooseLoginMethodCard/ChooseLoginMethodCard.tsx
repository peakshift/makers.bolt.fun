import { FaBolt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Button from "src/Components/Button/Button";

interface Props {
  onChooseLoginMethod: (method: "lightning" | "email") => void;
}

export default function ChooseLoginMethodCard({ onChooseLoginMethod }: Props) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-24 items-center">
      <h2 className="text-h4 font-bold text-center">
        Choose your Login Method
      </h2>

      <div className="w-full flex flex-col gap-16">
        <Button
          color="none"
          fullWidth
          className="bg-[#ffd046] hover:bg-[#f8da60] text-black"
          onClick={() => onChooseLoginMethod("lightning")}
        >
          <FaBolt /> Login with Lightning
        </Button>
        <Button
          color="gray"
          fullWidth
          className=""
          onClick={() => onChooseLoginMethod("email")}
        >
          <MdOutlineAlternateEmail /> Login with Email
        </Button>
      </div>
    </div>
  );
}
