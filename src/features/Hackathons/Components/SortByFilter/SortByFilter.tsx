import React, { useState } from "react";
import { useMediaQuery } from "src/utils/hooks";
import { MEDIA_QUERIES } from "src/utils/theme";

const filters = [
  {
    text: "All",
    value: null,
  },
  {
    text: "Upcoming",
    value: "Upcoming",
  },
  {
    text: "Live",
    value: "Live",
  },
  {
    text: "Finished",
    value: "Finished",
  },
];

interface Props {
  filterChanged?: (newFilter: string | null) => void;
}

export default function SortByFilter({ filterChanged }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const filterClicked = (_newValue: string | null) => {
    const newValue = selected !== _newValue ? _newValue : null;
    setSelected(newValue);
    filterChanged?.(newValue);
  };
  const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMinMedium);

  return (
    <ul className="flex flex-wrap gap-8">
      {filters.map((f, idx) => (
        <li
          key={f.value}
          className={` 
                  text-primary-600 rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${
                      f.value === selected
                        ? "bg-primary-100"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
          onClick={() => filterClicked(f.value)}
          role="button"
        >
          {f.text}
        </li>
      ))}
    </ul>
  );
}
