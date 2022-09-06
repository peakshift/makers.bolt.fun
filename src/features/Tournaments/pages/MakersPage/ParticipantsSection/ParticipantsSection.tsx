import { useDebouncedState } from '@react-hookz/web';
import { useState } from 'react'
import { GenericMakerRole } from 'src/graphql'
import MakersFilters from '../MakersFilters/MakersFilters';
import MakersList from './MakersList';

interface Props {
    tournamentId: number
}
export default function ParticipantsSection({ tournamentId }: Props) {

    const [searchFilter, setSearchFilter] = useState("");
    const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState("", 500);
    const [roleFilter, setRoleFilter] = useState<GenericMakerRole | null>(null);



    const changeSearchFilter = (new_value: string) => {
        setSearchFilter(new_value);
        setDebouncedSearchFilter(new_value);
    }



    return (<>
        <div className="flex flex-col gap-16">
            <h3 className="text-body1 text-gray-900 font-bold mt-24">Makers 👾</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                <MakersFilters
                    searchValue={searchFilter}
                    onSearchChange={changeSearchFilter}
                    roleValue={roleFilter}
                    onRoleChange={setRoleFilter}
                />
            </div>
        </div>
        <MakersList searchFilter={debouncedsearchFilter} roleFilter={roleFilter?.id ?? null} tournamentId={tournamentId} />
    </>
    )
}
