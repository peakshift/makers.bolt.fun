import { useDebouncedState } from '@react-hookz/web';
import { useState } from 'react'
import { GenericMakerRole } from 'src/graphql'
import MakersFilters from '../MakersFilters/MakersFilters';
import MakersList from './MakersList';
import ProjectsList from './ProjectsList';

interface Props {
    tournamentId: number
}
export default function ParticipantsSection({ tournamentId }: Props) {

    const [searchFilter, setSearchFilter] = useState("");
    const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState("", 500);
    const [roleFilter, setRoleFilter] = useState<GenericMakerRole | null>(null);
    const [curTab, setCurTab] = useState<'makers' | 'projects'>('makers')



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
        <div className="flex gap-8">
            <button
                className={` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${curTab === 'makers' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}
                     `}
                onClick={() => setCurTab('makers')}
            >
                Makers looking for projects
            </button>
            <button
                className={` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${curTab === 'projects' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}
                     `}
                onClick={() => setCurTab('projects')}
            >
                Projects looking for makers
            </button>
        </div>
        {curTab === 'projects' && <ProjectsList searchFilter={debouncedsearchFilter} roleFilter={roleFilter?.id ?? null} tournamentId={tournamentId} />}
        {curTab === 'makers' && <MakersList searchFilter={debouncedsearchFilter} roleFilter={roleFilter?.id ?? null} tournamentId={tournamentId} />}
    </>
    )
}
