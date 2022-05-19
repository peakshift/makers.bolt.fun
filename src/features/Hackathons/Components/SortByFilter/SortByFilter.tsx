import React, { useState } from 'react'

const filters = [
    {
        text: "Upcoming",
        value: 'Upcoming'
    }, {
        text: "Live",
        value: 'live'
    }, {
        text: "Complete",
        value: 'complete'
    },
]

interface Props {
    filterChanged?: (newFilter: string) => void
}

export default function SortByFilter({ filterChanged }: Props) {

    const [selected, setSelected] = useState(filters[0].value);

    const filterClicked = (newValue: string) => {
        if (selected === newValue)
            return
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
