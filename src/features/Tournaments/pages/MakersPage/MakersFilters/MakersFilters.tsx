import { FiSearch } from 'react-icons/fi'
import BasicSelectInput from 'src/Components/Inputs/Selects/BasicSelectInput/BasicSelectInput';
import { GenericMakerRole, useGetAllRolesQuery } from 'src/graphql';

interface Props {
    searchValue: string;
    onSearchChange: (new_value: string) => void;

    roleValue: GenericMakerRole | null
    onRoleChange: (new_value: GenericMakerRole | null) => void;
}

export default function MakersFilters(props: Props) {

    const allRolesQuery = useGetAllRolesQuery();

    const options = allRolesQuery.data?.getAllMakersRoles


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
                isLoading={allRolesQuery.loading}
                labelField='title'
                valueField='id'
                placeholder='Any role'
                isClearable
                value={props.roleValue}
                onChange={props.onRoleChange}
                options={options ?? []}
                renderOption={option => <div className={`flex gap-16 my-4 px-16 py-12 rounded-12 text-gray-800 ${option.isSelected ? "bg-gray-100 text-gray-800" : "hover:bg-gray-50"} cursor-pointer`}>
                    {option.data.icon} {option.data.title}
                </div>}

            />
        </>
    )
}

// const x = Object.values(TournamentEventTypeEnum)