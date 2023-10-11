import ChooseLoginMethods from "../ChooseLoginMethods/ChooseLoginMethods";

interface Props {
  onChooseLoginMethod: (method: "lightning" | "email" | "nostr") => void;
}

export default function ChooseLoginMethodCard({ onChooseLoginMethod }: Props) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-24 items-center">
      <h2 className="text-h4 font-bold text-center">
        Choose your Sign-in Method
      </h2>

      <ChooseLoginMethods onChooseLoginMethod={onChooseLoginMethod} />
    </div>
  );
}
