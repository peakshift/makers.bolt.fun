import { FiSearch } from 'react-icons/fi';
import BasicSelectInput from 'src/Components/Inputs/Selects/BasicSelectInput/BasicSelectInput';
import { TournamentTrack } from 'src/graphql'
import { useTournament } from '../../TournamentDetailsPage/TournamentDetailsContext';

export type TrackFilterType = Pick<TournamentTrack, 'id' | 'title' | 'icon'>

interface Props {
    searchValue: string;
    onSearchChange: (new_value: string) => void;

    trackValue: TrackFilterType | null
    onTrackChange: (new_value: TrackFilterType | null) => void;
}


export default function ProjectsFilters(props: Props) {
    const { tournamentDetails: { tracks }, } = useTournament()

    return (
        <>
            <div className="input-wrapper relative lg:col-span-2">
                <FiSearch className="self-center ml-16 flex-shrink-0 w-[20px] text-gray-400" />
                <input
                    type='text'
                    className="input-text"
                    placeholder="Search"
                    value={props.searchValue}
                    onChange={e => props.onSearchChange(e.target.value)}
                />
            </div>
            <BasicSelectInput
                isMulti={false}
                labelField='title'
                valueField='id'
                placeholder='All tracks'
                isClearable
                value={props.trackValue}
                onChange={(v) => props.onTrackChange(v)}
                formatOption={data => data.icon + ' ' + data.title}
                options={tracks}
            />
        </>
    )
}
