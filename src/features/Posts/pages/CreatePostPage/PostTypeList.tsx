import { spawn } from 'child_process';
import React, { useState } from 'react'

const types = [
    {
        text: "📜 Story",
        value: 'story',
        disabled: false
    }, {
        text: "💰 Bounty",
        value: 'bounty',
        disabled: true,
    }, {
        text: "❓ Question",
        value: 'question',
        disabled: true,
    },
] as const;

type Value = typeof types[number]['value'];

interface Props {
    selectionChanged?: (newFilter: Value) => void
}

export default function PostTypeList({ selectionChanged }: Props) {

    const [selected, setSelected] = useState<Value>(types[0].value);

    const handleClick = (newValue: Value) => {
        if (selected === newValue)
            return
        setSelected(newValue);
        selectionChanged?.(newValue);
    }

    return (
        <div className=''>
            <p className="text-body2 font-bolder text-black mb-16">Type of post</p>
            <ul>
                {types.map((f, idx) => <li
                    key={f.value}
                    className={`
                    p-12 rounded-8 cursor-pointer font-bold 
                    ${f.value === selected && 'bg-gray-100'}
                    ${f.disabled && 'opacity-40'}
                    `}
                    onClick={() => !f.disabled && handleClick(f.value)}
                >
                    {f.text} {f.disabled && <span className="text-gray-400 text-body5">(WIP)</span>}
                </li>)}
            </ul>
        </div>
    )
}
