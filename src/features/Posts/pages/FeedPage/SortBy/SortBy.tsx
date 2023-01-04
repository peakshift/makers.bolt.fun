import { useState } from "react";
import { Nullable } from "remirror";

const filters = [
  {
    text: "Recent",
    value: "recent",
  },
  {
    text: "Popular",
    value: "popular",
  },
] as const;

type FilterValues = typeof filters[number]["value"];

interface Props {
  filterChanged?: (newFilter: string | null) => void;
}

export default function SortBy({ filterChanged }: Props) {
  const [selected, setSelected] = useState<Nullable<FilterValues>>("recent");

  const filterClicked = (_newValue: FilterValues) => {
    const newValue = selected !== _newValue ? _newValue : null;
    setSelected(newValue);
    filterChanged?.(newValue);
  };

  return (
    <ul className="flex gap-8">
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
