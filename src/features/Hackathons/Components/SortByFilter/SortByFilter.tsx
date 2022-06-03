import React, { useState } from 'react'
import AutoComplete from 'src/Components/Inputs/Autocomplete/Autocomplete';
import { useMediaQuery } from 'src/utils/hooks';
import { MEDIA_QUERIES } from 'src/utils/theme';

const filters = [
    {
        text: "Upcoming",
        value: 'Upcoming'
    }, {
        text: "Live",
        value: 'Live'
    }, {
        text: "Finished",
        value: 'Finished'
    },
]

interface Props {
    filterChanged?: (newFilter: string | null) => void
}

export default function SortByFilter({ filterChanged }: Props) {

    const [selected, setSelected] = useState<string | null>('Upcoming');

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
                        <ul className='flex flex-col gap-4'>
                            {filters.map((f, idx) => <li
                                key={f.value}
                                className={`
                                p-12 rounded-8 cursor-pointer font-bold  
                                active:scale-95 transition-transform
                                ${f.value === selected ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                onClick={() => filterClicked(f.value)}
                                role='button'
                            >
                                {f.text}
                            </li>)}
                        </ul>
                    </div >
                    :
                    <AutoComplete
                        isClearable
                        isMulti={false}
                        placeholder='Sort By'
                        options={filters}
                        labelField='text'
                        valueField='value'
                        size='lg'
                        onChange={(o) => filterClicked(o ? o.value : null)} />
            }</>

    )
}
