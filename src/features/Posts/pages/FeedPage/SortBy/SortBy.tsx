import { useMediaQuery } from 'src/utils/hooks';
import React, { useState } from 'react'
import { Nullable } from 'remirror';
import AutoComplete from 'src/Components/Inputs/Autocomplete/Autocomplete';
import { MEDIA_QUERIES } from 'src/utils/theme';

const filters = [
    {
        text: "Popular",
        value: 'popular'
    }, {
        text: "Newest",
        value: 'newest'
    }, {
        text: "Following",
        value: 'following'
    },
]

interface Props {
    filterChanged?: (newFilter: string | null) => void
}

export default function SortBy({ filterChanged }: Props) {

    const [selected, setSelected] = useState<Nullable<string>>(null);

    const filterClicked = (_newValue: string | null) => {
        const newValue = selected !== _newValue ? _newValue : null;
        setSelected(newValue);
        filterChanged?.(newValue);
    }

    return (
        <ul className='flex gap-8'>
            {filters.map((f, idx) => <li
                key={f.value}
                className={` 
                  text-primary-600 rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${f.value === selected ? 'bg-primary-100' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => filterClicked(f.value)}
                role='button'
            >
                {f.text}
            </li>)}
        </ul>

    )
}
