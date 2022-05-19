import { useState } from 'react'

const filters = [
    {
        text: 'Design',
        value: 'Design',
        icon: "🎨"
    },
    {
        text: 'Development',
        value: 'Development',
        icon: "💻"
    },
    {
        text: 'Startups',
        value: 'Startups',
        icon: "🚀"
    },
    {
        text: 'Lightning Network',
        value: 'Lightning Network',
        icon: "⚡️"
    },
]

interface Props {
    filterChanged?: (newFilter: string) => void
}

export default function TopicsFilter({ filterChanged }: Props) {

    const [selected, setSelected] = useState(filters[0].value);

    const filterClicked = (newValue: string) => {
        if (selected === newValue)
            return
        setSelected(newValue);
        filterChanged?.(newValue);
    }

    return (
        <div className='bg-white border rounded-12 p-16'>
            <p className="text-body2 font-bolder text-black mb-16">Topics</p>
            <ul className=' flex flex-col gap-16'>
                {filters.map((f, idx) => <li
                    key={f.value}
                    className={`flex items-start rounded-8 cursor-pointer font-bold ${f.value === selected && 'bg-gray-50'}`}
                    onClick={() => filterClicked(f.value)}
                >
                    <span className='bg-gray-50 rounded-8 p-8'>{f.icon}</span>
                    <span className="self-center px-16">
                        {f.text}
                    </span>
                </li>)}
            </ul>
        </div>
    )
}
