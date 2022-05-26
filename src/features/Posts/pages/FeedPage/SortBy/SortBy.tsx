import { useMediaQuery } from '@react-hookz/web';
import React, { useState } from 'react'
import { Nullable } from 'remirror';
import AutoComplete from 'src/Components/Inputs/Autocomplete/Autocomplete';
import { MEDIA_QUERIES } from 'src/utils/theme';

const filters = [
    {
        text: "🔥 Hottest",
        value: 'hottest'
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

    const filterClicked = (_newValue: string | null) => {
        const newValue = selected !== _newValue ? _newValue : null;
        setSelected(newValue);
        filterChanged?.(newValue);
    }


    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)



    return (
        <>
            {
                isMdScreen ?
                    <div className='bg-white border-2 rounded-12 p-16'>
                        < p className="text-body2 font-bolder text-black mb-16" > Sort By</p >
                        <ul>
                            {filters.map((f, idx) => <li
                                key={f.value}
                                className={`p-12 rounded-8 cursor-pointer font-bold ${f.value === selected && 'bg-gray-200'}`}
                                onClick={() => filterClicked(f.value)}
                            >
                                {f.text}
                            </li>)}
                        </ul>
                    </div >
                    :
                    <AutoComplete
                        isClearable
                        placeholder='Sort By'
                        options={filters}
                        labelField='text'
                        valueField='value'
                        onChange={(o) => filterClicked(o ? o.value : null)} />
            }</>

    )
}
