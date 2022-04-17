import React, { useState } from 'react'

const filters = [
    {
        text: "🔥 All",
        value: 'all'
    }, {
        text: "Lightning Network",
        value: 'lightning-network'
    }, {
        text: "Bitcoin",
        value: 'bitcoin'
    }, {
        text: "Cybersecurity",
        value: 'cybersecurity'
    }, {
        text: "Bounties",
        value: 'bounties'
    }, {
        text: "Grants",
        value: 'Grants'
    },
]

interface Props {
    filterChanged?: (newFilter: string) => void
}

export default function PopularCategories({ filterChanged }: Props) {

    const [selected, setSelected] = useState(filters[0].value);

    const filterClicked = (newValue: string) => {
        if (selected === newValue)
            return
        setSelected(newValue);
        filterChanged?.(newValue);
    }

    return (
        <div className=''>
            <p className="text-body2 font-bolder text-black mb-16">Popular Categories</p>
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
