import { FaBolt } from "react-icons/fa";
import { GiOstrich } from "react-icons/gi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Button from "src/Components/Button/Button";

interface Props {
  onChooseLoginMethod: (method: "lightning" | "email" | "nostr") => void;
}

export default function ChooseLoginMethodCard({ onChooseLoginMethod }: Props) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-24 items-center">
      <h2 className="text-h4 font-bold text-center">
        Choose your Sign-in Method
      </h2>

      <div className="w-full flex flex-col gap-16">
        <Button
          color="none"
          fullWidth
          className="bg-[#ffd046] hover:bg-[#f8da60] text-black"
          onClick={() => onChooseLoginMethod("lightning")}
        >
          <FaBolt /> Sign-in with Lightning
        </Button>
        <Button
          color="gray"
          fullWidth
          className=""
          onClick={() => onChooseLoginMethod("email")}
        >
          <MdOutlineAlternateEmail /> Sign-in with Email
        </Button>
        <Button
          color="none"
          fullWidth
          className="!text-white bg-violet-600"
          onClick={() => onChooseLoginMethod("nostr")}
        >
          <GiOstrich /> Sign-in with Nostr
        </Button>
      </div>
    </div>
  );
}
