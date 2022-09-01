import { FiSearch } from 'react-icons/fi'
import AutoComplete from 'src/Components/Inputs/Autocomplete/Autocomplete';
import { TournamentEventTypeEnum } from 'src/graphql';
import { mapTypeToBadge } from '../EventCard/EventCard';

interface Props {
    searchValue: string;
    onSearchChange: (new_value: string) => void;

    eventValue: TournamentEventTypeEnum | null
    onEventChange: (new_value: TournamentEventTypeEnum | null) => void;
}

export default function EventsFilters(props: Props) {

    const options = [{
        label: "📆 All events",
        value: null as TournamentEventTypeEnum | null,
    }]
        .concat(Object.values(TournamentEventTypeEnum).map((v: TournamentEventTypeEnum) => ({ label: mapTypeToBadge[v].text, value: v })))

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
            <AutoComplete
                labelField='label'
                valueField='value'
                isMulti={false}
                size='lg'
                placeholder='All events'
                value={props.eventValue ? { label: mapTypeToBadge[props.eventValue].text, value: props.eventValue } : null}
                onChange={(v) => props.onEventChange(v ? v.value : null)}
                options={options}

            />
        </>
    )
}

// const x = Object.values(TournamentEventTypeEnum)