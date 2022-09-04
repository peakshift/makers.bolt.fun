import React, { useState } from 'react'
import { GenericMakerRole, Tournament, TournamentEventTypeEnum, useGetMakersInTournamentQuery, User } from 'src/graphql'
import MakerCard from './MakerCard/MakerCard';
import EventCard from './MakerCard/MakerCard';
import MakersFilters from './MakersFilters/MakersFilters';
import EventsFilters from './MakersFilters/MakersFilters';

interface Props {
    data: Pick<Tournament,
        | 'id'>
}

export default function MakersPage({ data: { id } }: Props) {

    const query = useGetMakersInTournamentQuery({
        variables: {
            tournamentId: id,
            roleId: null,
            search: null,
            skip: null,
            take: null,
        },
    })


    const [searchFilter, setSearchFilter] = useState("")
    const [roleFilter, setRoleFilter] = useState<GenericMakerRole | null>(null)

    if (query.loading) return <></>

    return (
        <div className='pb-42'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                <div className="md:col-span-2 lg:col-span-3"><MakerCard maker={query.data?.me as User} /></div>
                <MakersFilters
                    searchValue={searchFilter}
                    onSearchChange={setSearchFilter}
                    roleValue={roleFilter}
                    onRoleChange={setRoleFilter}
                />
                {/* {
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
                } */}
            </div>
        </div>
    )
}
