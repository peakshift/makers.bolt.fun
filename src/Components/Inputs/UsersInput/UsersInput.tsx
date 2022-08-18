
import AsyncSelect from 'react-select/async';
import { OnChangeValue, StylesConfig, components, OptionProps } from "react-select";
import { SearchUsersDocument, SearchUsersQuery, SearchUsersQueryResult } from "src/graphql";
import { apolloClient } from "src/utils/apollo";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import debounce from 'lodash.debounce';



type User = SearchUsersQuery['searchUsers'][number]

interface Props {
    classes?: {
        container?: string
        input?: string
    }
    placeholder?: string,
    onSelect?: (selectedUser: User) => void
}

const fetchOptions = debounce((value, callback: any) => {
    apolloClient.query({
        query: SearchUsersDocument,
        variables: {
            value
        }
    })
        .then((result) => callback((result as SearchUsersQueryResult).data?.searchUsers ?? []))
        .catch((error: any) => callback(error, null));
}, 1000);




const OptionComponent = (props: OptionProps<User>) => {
    return (
        <div>
            <components.Option {...props} className='!flex items-center gap-16 !py-16'>
                <Avatar src={props.data.avatar} width={48} />
                <div>
                    <p className="font-medium self-center">
                        {props.data.name}
                    </p>
                    <p className="text-body5 text-gray-500">
                        {props.data.jobTitle}
                    </p>
                </div>
            </components.Option>

        </div>
    );
};


const colourStyles: StylesConfig = {

    control: (styles, state) => ({
        ...styles,
        padding: '5px 16px',
        borderRadius: 12,
        // border: 'none',
        // boxShadow: 'none',

        ":hover": {
            cursor: "pointer"
        },
        ":focus-within": {
            '--tw-border-opacity': '1',
            borderColor: 'rgb(179 160 255 / var(--tw-border-opacity))',
            outlineColor: '#9E88FF',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
            '--tw-ring-color': 'rgb(179 160 255 / var(--tw-ring-opacity))',
            '--tw-ring-opacity': '0.5'
        }

    }),
    multiValueRemove: (styles) => ({
        ...styles,
        ":hover": {
            background: 'none'
        }
    }),
    indicatorsContainer: () => ({ display: 'none' }),
    clearIndicator: () => ({ display: 'none' }),
    indicatorSeparator: () => ({ display: "none" }),
    input: (styles, state) => ({
        ...styles,
        " input": {
            boxShadow: 'none !important'
        },
    }),
    multiValue: styles => ({
        ...styles,
        padding: '4px 12px',
        borderRadius: 48,
        fontWeight: 500
    }),
    valueContainer: (styles) => ({
        ...styles,
        paddingLeft: 0,
        paddingRight: 0,
    })
}


export default function UsersInput({
    classes,
    ...props }: Props) {

    const [inputValue, setInputValue] = useState("")

    const placeholder = props.placeholder ?? <span className='text-gray-400'><FiSearch /> <span className='align-middle'>Search by username</span></span>

    const handleChange = (newValue: OnChangeValue<User, false>,) => {
        if (newValue)
            props.onSelect?.(newValue);
    }

    let emptyMessage = "Type at least 2 characters";
    if (inputValue.length >= 2)
        emptyMessage = "Couldn't find any users..."


    let loadingMessage = "Searching...";
    if (inputValue.length < 2)
        loadingMessage = "Type at least 2 characters"

    return (
        <div className={`${classes?.container}`}>
            <AsyncSelect
                value={null}
                inputValue={inputValue}
                onInputChange={setInputValue}
                defaultOptions={false}
                loadOptions={fetchOptions}
                loadingMessage={() => loadingMessage}
                placeholder={placeholder}
                noOptionsMessage={() => emptyMessage}
                onChange={handleChange as any}
                components={{
                    Option: OptionComponent,
                    // ValueContainer: CustomValueContainer
                }}
                styles={colourStyles as any}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--primary)',
                    },
                })}
            />
            {/* <div className="flex mt-16 gap-8 flex-wrap">
                {(value as Tag[]).map((tag, idx) => <Badge color="gray" key={tag.title} onRemove={() => handleRemove(idx)} >{tag.title}</Badge>)}
            </div> */}
        </div>
    )
}
