import { FaBolt } from "react-icons/fa";
import { GiOstrich } from "react-icons/gi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Button from "src/Components/Button/Button";

interface Props {
  onChooseLoginMethod: (method: "lightning" | "email" | "nostr") => void;
}
export default function ChooseLoginMethods({ onChooseLoginMethod }: Props) {
  return (
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
  );
}
