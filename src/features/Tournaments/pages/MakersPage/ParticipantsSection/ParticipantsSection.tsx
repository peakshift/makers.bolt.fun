import { useDebouncedState } from '@react-hookz/web';
import { useState } from 'react'
import { GenericMakerRole } from 'src/graphql'
import { useCarousel } from 'src/utils/hooks';
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
    const [curTab, setCurTab] = useState<'all-makers' | 'makers-to-team' | 'projects'>('all-makers')


    const { viewportRef, } = useCarousel({
        align: 'start', slidesToScroll: 1,
        containScroll: "trimSnaps",
    })

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
        <div className="overflow-hidden" ref={viewportRef}>
            <div className="select-none w-full flex gap-8">
                <button
                    className={` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${curTab === 'all-makers' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}
                     `}
                    onClick={() => setCurTab('all-makers')}
                >
                    All makers
                </button>
                <button
                    className={` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${curTab === 'makers-to-team' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}
                     `}
                    onClick={() => setCurTab('makers-to-team')}
                >
                    Makers looking for a team
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
        </div>
        {curTab === 'projects' && <ProjectsList searchFilter={debouncedsearchFilter} roleFilter={roleFilter?.id ?? null} tournamentId={tournamentId} />}
        {curTab !== 'projects' && <MakersList onlyLookingToTeam={curTab === 'makers-to-team'} searchFilter={debouncedsearchFilter} roleFilter={roleFilter?.id ?? null} tournamentId={tournamentId} />}
    </>
    )
}
