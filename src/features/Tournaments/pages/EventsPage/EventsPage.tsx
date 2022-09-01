import React from 'react'
import { Tournament } from 'src/graphql'
import EventCard from './EventCard/EventCard';

interface Props {
    data: Pick<Tournament,
        | 'events_count'
        | 'events'>
}

export default function EventsPage({ data: { events, events_count } }: Props) {
    return (
        <div className='pb-42'>
            <h2 className='text-body1 font-bolder text-gray-900 mb-24'>Events 📆 ({events_count})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                {
                    events.map(event => <EventCard key={event.id} event={event} />)
                }
            </div>
        </div>
    )
}
