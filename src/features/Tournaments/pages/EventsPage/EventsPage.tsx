import { useState } from 'react'
import { TournamentEventTypeEnum } from 'src/graphql'
import { useTournament } from '../TournamentDetailsPage/TournamentDetailsContext';
import EventCard from './EventCard/EventCard';
import EventsFilters from './EventsFilters/EventsFilters';

export default function EventsPage() {

    const [searchFilter, setSearchFilter] = useState("")
    const [eventFilter, setEventFilter] = useState<TournamentEventTypeEnum | null>(null)
    const { tournamentDetails: { events, events_count } } = useTournament()

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
