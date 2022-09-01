import React, { useState } from 'react'
import { Tournament, TournamentEventTypeEnum } from 'src/graphql'
import EventCard from './EventCard/EventCard';
import EventsFilters from './EventsFilters/EventsFilters';

interface Props {
    data: Pick<Tournament,
        | 'events_count'
        | 'events'>
}

export default function EventsPage({ data: { events, events_count } }: Props) {

    const [searchFilter, setSearchFilter] = useState("")
    const [eventFilter, setEventFilter] = useState<TournamentEventTypeEnum | null>(null)

    return (
        <div className='pb-42'>
            <h2 className='text-body1 font-bolder text-gray-900 mb-24'>Events 📆 ({events_count})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                <EventsFilters
                    searchValue={searchFilter}
                    onSearchChange={setSearchFilter}
                    eventValue={eventFilter}
                    onEventChange={setEventFilter}
                />
                {
                    events
                        .filter(event => {
                            if (!searchFilter) return true;
                            return event.title.search(new RegExp(searchFilter, 'i')) !== -1 || event.description.search(new RegExp(searchFilter, 'i')) !== -1
                        })
                        .filter(event => {
                            if (!eventFilter) return true;
                            return event.type === eventFilter;
                        })
                        .map(event => <EventCard key={event.id} event={event} />)
                }
            </div>
        </div>
    )
}
