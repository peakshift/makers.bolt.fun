import React, { useState } from 'react'
import { Nullable } from 'remirror';

const filters = [
    {
        text: "🔥 Popular",
        value: 'popular'
    }, {
        text: "📆 Newest",
        value: 'newest'
    }, {
        text: "🎭 Trending",
        value: 'trending'
    },
]

interface Props {
    filterChanged?: (newFilter: string | null) => void
}

export default function SortBy({ filterChanged }: Props) {

    const [selected, setSelected] = useState<Nullable<string>>(filters[0].value);

    const filterClicked = (_newValue: string) => {
        const newValue = selected !== _newValue ? _newValue : null;
        setSelected(newValue);
        filterChanged?.(newValue);
    }

    return (
        <div className='bg-white border rounded-12 p-16'>
            <p className="text-body2 font-bolder text-black mb-16">Sort By</p>
            <ul>
                {filters.map((f, idx) => <li
                    key={f.value}
                    className={`p-12 rounded-8 cursor-pointer font-bold ${f.value === selected && 'bg-gray-100'}`}
                    onClick={() => filterClicked(f.value)}
                >
                    {f.text}
                </li>)}
            </ul>
        </div>
    )
}
