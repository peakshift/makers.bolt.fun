import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import IconButton from "src/Components/IconButton/IconButton";
import UsersInput from "src/Components/Inputs/UsersInput/UsersInput";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { User } from "src/graphql";

interface Props {
  initialValue?: Pick<User, "id" | "name" | "avatar" | "jobTitle">[];
  value: number[];
  onChange: (value: number[]) => void;
}

export default function SelectJudgesInput({
  initialValue,
  value,
  onChange,
}: Props) {
  const [makers, setMakers] = useState<
    Pick<User, "id" | "name" | "avatar" | "jobTitle">[]
  >(initialValue ?? []);

  useEffect(() => {
    onChange(makers.map((m) => m.id));
  }, [makers, onChange]);

  return (
    <div>
      <UsersInput
        placeholder="Search for makers by username"
        onSelect={(s) => {
          if (makers.find((m) => m.id === s.id)) return;
          setMakers([...makers, s]);
        }}
      />

      <ul className="flex flex-col gap-8 mt-8">
        {makers.map((maker) => (
          <li key={maker.id} className="flex items-center gap-8 py-8">
            <Avatar width={48} src={maker.avatar} />
            <div className="overflow-hidden">
              <p
                className={`'text-body4' text-black font-medium overflow-hidden text-ellipsis whitespace-nowrap`}
              >
                {maker.name}
              </p>
              <p className="text-gray-600">{maker.jobTitle}</p>
            </div>
            <IconButton
              className="text-gray-500 ml-auto"
              aria-label="Remove maker"
              onClick={() => setMakers(makers.filter((m) => m.id !== maker.id))}
            >
              <IoClose />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
