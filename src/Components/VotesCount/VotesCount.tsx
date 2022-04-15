import React from 'react'
import { MdLocalFireDepartment } from 'react-icons/md'

export default function VotesCount({ count = 0 }: { count: number }) {
    return (
        <span className="chip-small bg-warning-50 text-gray-900 font-medium text-body5 py-4 px-16">
            <MdLocalFireDepartment className='inline-block text-fire transform text-body4' />
            <span className=' align-middle'> {count}</span>
        </span>
    )
}
