import React from 'react'
import { MdSearch } from 'react-icons/md'

export default function EventsFilters() {
    return (
        <>
            <div className="input-wrapper mt-8 relative lg:col-span-2">

                <MdSearch className="input-icon pr-0 flex-shrink-0 self-center text-gray-400" />
                <input
                    type='text'
                    className="input-text"
                    placeholder="Search"
                />
            </div>
            <div className="input-wrapper mt-8 relative">
                <input
                    type='text'
                    className="input-text"
                    placeholder="All events"
                />
            </div>
        </>
    )
}
