import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BsSearch } from 'react-icons/bs';
import { useClickOutside, useThrottledCallback } from '@react-hookz/web'
import SearchResults from './SearchResults/SearchResults'
import { useLazyQuery } from '@apollo/client';
import { SEARCH_PROJECTS_QUERY, SEARCH_PROJECTS_QUERY_RES_TYPE, SEARCH_PROJECTS_QUERY_VARS } from './query';
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { toggleSearch } from 'src/redux/features/ui.slice';

interface Props {
    height?: number | string;
    width?: number | string;
}

const SearchResultsListVariants = {
    hidden: {
        opacity: 0,
        y: 300,
        display: 'none'
    },
    visible: {
        opacity: 1,
        y: 16,
        display: 'block'
    }
}

export default function Search({

    width,
    height,
}: Props) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchInput, setSearchInput] = useState("");
    const containerRef = useRef<HTMLDivElement>(null)

    const { isOpen } = useAppSelector(state => ({
        isOpen: state.ui.isSearchOpen
    }))
    const dispatch = useAppDispatch()

    useClickOutside(containerRef, () => {
        if (isOpen)
            dispatch(toggleSearch(false))
    })

    const [executeQuery, { data, loading }] = useLazyQuery<SEARCH_PROJECTS_QUERY_RES_TYPE, SEARCH_PROJECTS_QUERY_VARS>(SEARCH_PROJECTS_QUERY);


    const throttledExecuteQuery = useThrottledCallback((search: string) => {
        executeQuery({
            variables: {
                search
            }
        })
    }, [executeQuery], 500)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        throttledExecuteQuery(e.target.value)
    }



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        throttledExecuteQuery(searchInput)
        // Make Search Request
        // onSearch(searchInput);
    };

    useEffect(() => {
        if (isOpen)
            inputRef.current?.focus();
        else {
            setSearchInput('')
        }

    }, [isOpen])


    return (
        <div className="relative h-full" ref={containerRef}>

            {<motion.form
                initial={{
                    opacity: 0,
                    x: '100%'
                }}
                animate={isOpen ? {
                    opacity: 1,
                    x: '0',
                    transition: { type: "spring", stiffness: 70 }

                } : {
                    opacity: 0,
                    x: '100%',
                    transition: {
                        ease: "easeIn"
                    }
                }}
                className='absolute top-0 right-0 flex items-center h-full'
                onSubmit={handleSubmit}
                style={{
                    width: width ?? '326px',
                    height: height ?? '100%'
                }}
            >
                <div className="input-wrapper bg-white !rounded-12 ring-1 ring-gray-400">
                    <BsSearch className={`input-icon`} />
                    <input
                        ref={inputRef}
                        className="input-field placeholder-black pl-0"
                        placeholder='Search'
                        value={searchInput}
                        onChange={handleChange}
                    />
                </div>
                <motion.div
                    variants={SearchResultsListVariants}
                    initial='hidden'
                    animate={
                        searchInput.length > 0 ? 'visible' : 'hidden'
                    }
                    className="absolute top-full translate-y-8 w-full left-0">
                    <SearchResults
                        isLoading={loading}
                        projects={data?.searchProjects}
                    />
                </motion.div>
            </motion.form>}
        </div>
    )
}
