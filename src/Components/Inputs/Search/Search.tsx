
import AsyncSelect from 'react-select/async';
import { OnChangeValue, StylesConfig, components, OptionProps } from "react-select";
import { SearchUsersDocument, SearchUsersQuery, SearchUsersQueryResult } from "src/graphql";
import { apolloClient } from "src/utils/apollo";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import debounce from 'lodash.debounce';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import {
    InstantSearch,
    useSearchBox,
    Hits,
    Highlight,
    Snippet,
    Index
  } from 'react-instantsearch';
  import VoteButton from 'src/Components/VoteButton/VoteButton';


interface Props {
    classes?: {
        container?: string
        input?: string
    }
    placeholder?: string,
}

const HitComponentStories = ({ hit }: { hit: any }) => {
    return (
        <div className="flex items-center my-2 z-100 border bg-white rounded-12 w-[750px] max-w-full h-80 justify-between">
            {hit.cover_image ? (
                <img src={hit.cover_image} alt="story cover" className="h-full rounded-l-12 mr-16" />
            ) : (
                <img src="https://via.placeholder.com/1600x900.png?text=No+Cover+Image" alt="story cover" className="h-full rounded-l-12 mr-16" />
            )}
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <h1 className="font-bold">{hit.title}</h1>
                    {/* <p className="text-xs font-light opacity-70">by {hit.user}</p> */}
                </div>
                <p className="line-clamp-2 text-xs font-light text-gray-600">{hit.excerpt}</p>
            </div>
            <div className="px-2 flex flex-col justify-end">
                {/* <p className="text-xs bg-gray-200 rounded-12 border p-1">Story</p> */}
                <VoteButton direction="vertical" votes={hit.votes_count} dense={true} />
            </div>
        </div>
    )
}
const HitComponentUsers = ({ hit }: { hit: any }) => {
    return (
        <div className="flex items-center gap-16 z-100">
            <p>{hit.id}</p>
            <p>{hit.name}</p>
            <p>{hit.lightning_address}</p>
        </div>
    )
}
const HitComponentTags = ({ hit }: { hit: any }) => {
    return (
        <div className="flex items-center gap-16 z-100" key={hit.id}>
            <p>{hit.id}</p>
            <p>{hit.title}</p>
            <p>{hit.description}</p>
        </div>
    )
}
const HitComponentCategories = ({ hit }: { hit: any }) => {
    return (
        <div className="flex items-center gap-16 z-100">
            <p>{hit.id}</p>
            <p>{hit.title}</p>
        </div>
    )
}

function SearchBar({ placeholder }: { placeholder: string }) {
    const { refine } = useSearchBox();
    return (
        <div className="relative mb-10">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch />
            </span>
            <input
                onChange={e => refine(e.target.value)}
                placeholder={
                    placeholder
                }
                className={`pl-40 pr-10 py-10 rounded-12 border-2 border-gray-200 transition-all duration-200 ease-in-out outline-none
                    focus:outline-[#9E88FF] focus:border-[rgb(179 160 255 / 1)] focus:ring-[rgb(179 160 255 / 0.5)] w-[750px] max-w-full`}
            />
        </div>
    );
}

export default function Search({
    classes,
    ...props }: Props) {

    const [inputValue, setInputValue] = useState("")
    const searchClient = instantMeiliSearch(
        process.env.REACT_APP_MEILISEARCH_HOST as string,
        process.env.REACT_APP_MEILISEARCH_KEY as string, {
            placeholderSearch: false,
            primaryKey: 'id',
        }
    );
    const placeholder = props.placeholder ?? "Search for anything"

    return (
        <div className={`${classes?.container}`}>
            <InstantSearch searchClient={searchClient} indexName="Stories">
                <SearchBar placeholder={placeholder} />
                <Index indexName="Stories">
                    <Hits hitComponent={HitComponentStories} />
                </Index>
                <Index indexName="User">
                    <Hits hitComponent={HitComponentUsers} />
                </Index>
                <Index indexName="Tags">
                    <Hits hitComponent={HitComponentTags} />
                </Index>
                <Index indexName="Category">
                    <Hits hitComponent={HitComponentCategories} />
                </Index>
            </InstantSearch>
        </div>
    )
}
