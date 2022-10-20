import React, { FormEvent, useState } from 'react'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'
import { useAppDispatch } from 'src/utils/hooks'
import { PayloadAction } from '@reduxjs/toolkit'
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from 'src/Components/IconButton/IconButton'
import Badge from 'src/Components/Badge/Badge'
import { useGetFiltersQuery } from 'src/graphql'
import Skeleton from 'react-loading-skeleton';
import { random } from 'src/utils/helperFunctions';

interface Props extends ModalCard {
    initFilters?: Partial<ProjectsFilters>
    callbackAction: PayloadAction<Partial<ProjectsFilters>>
}



export interface IFormInputs {
    text: string,
    href: string,
}

export type ProjectsFilters = {
    categoriesIds: string[]
    tagsIds: string[]
    yearFounded: string
}

const yearsFounded = ['Any', '2016', '2017', '2018', '2019', '2020', '2021', '2022']

export default function FiltersModal({ onClose, direction, initFilters, callbackAction, ...props }: Props) {

    const dispatch = useAppDispatch()
    const query = useGetFiltersQuery();

    const [categoriesFilter, setCategoriesFilter] = useState<string[]>(initFilters?.categoriesIds ?? []);
    const [tagsFilter, setTagsFilter] = useState<string[]>(initFilters?.tagsIds ?? []);
    const [yearFoundedFilter, setYearFoundedFilter] = useState(initFilters?.yearFounded ?? yearsFounded[0]);

    const clickCategory = (id: string) => {
        if (categoriesFilter.includes(id))
            setCategoriesFilter(categoriesFilter.filter(v => v !== id));
        else
            setCategoriesFilter([...categoriesFilter, id]);
    }


    const clickTag = (id: string) => {
        if (tagsFilter.includes(id))
            setTagsFilter(tagsFilter.filter(v => v !== id));
        else
            setTagsFilter([...tagsFilter, id]);
    }

    const clearFilters = () => {
        setCategoriesFilter([]);
        setTagsFilter([]);
        setYearFoundedFilter(yearsFounded[0]);
    }

    const applyFilters = () => {
        const action = Object.assign({}, callbackAction);
        action.payload = { categoriesIds: categoriesFilter, tagsIds: tagsFilter, yearFounded: yearFoundedFilter }
        dispatch(action)
        onClose?.();
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card p-24 min-h-screen !rounded-0 relative"
        >

            <div className="page-container relative">
                <div className="flex justify-between items-center">
                    <h2 className='text-h2 font-bolder'>Filter Projects</h2>
                    <IconButton onClick={onClose} className='!bg-gray-100 hover:!bg-gray-200'>
                        <IoClose className='text-h3 text-gray-400' />
                    </IconButton>
                </div>
                <div className="flex flex-col gap-24 mt-24">
                    <hr className="bg-gray-100" />
                    <div>
                        <h3 className="text-body2 font-bolder">🌈 Category</h3>
                        <p className='text-gray-600 mt-8'>Select one or more tags to search from.</p>
                        <ul className="flex flex-wrap gap-16 mt-24">
                            {query.data?.categoryList
                                ?.filter(c => !!(c && c.name))
                                .map(category => <li
                                    key={category?.id}
                                >
                                    <button
                                        className={`
                                                px-12 py-8 border rounded-10 text-body5 font-medium
                                                active:scale-95 transition-transform
                                                ${!categoriesFilter.includes(category?.id!) ? "bg-gray-100 hover:bg-gray-200 border-gray-200" : "bg-primary-100 text-primary-600 border-primary-200"}
                                                `}
                                        onClick={() => clickCategory(category?.id!)}
                                    >{category?.icon} {category?.name}
                                    </button>
                                </li>)}
                            {query.loading &&
                                Array(10).fill(0).map((_, idx) => {

                                    return <div
                                        key={idx}
                                        className={`px-12 py-8 border bg-gray-100 hover:bg-gray-200 border-gray-200 rounded-10 text-body5 font-medium`}
                                    ><Skeleton width={`${Math.round(random(8, 15))}ch`} />
                                    </div>
                                })}
                        </ul>
                    </div>
                    <hr className="bg-gray-100" />
                    <div>
                        <h3 className="text-body2 font-bolder">🔖 Tags</h3>
                        <p className='text-gray-600 mt-8'>Select one or more tags to search from.</p>
                        <ul className="flex flex-wrap gap-16 mt-24">
                            {query.data?.tags
                                ?.filter(t => !!(t && t.name))
                                .map(tag => <li
                                    key={tag?.id}
                                >
                                    <button
                                        className={`
                                                px-12 py-8 border rounded-10 text-body5 font-medium
                                                active:scale-95 transition-transform
                                                ${!tagsFilter.includes(tag?.id!) ? "bg-gray-100 hover:bg-gray-200 border-gray-200" : "bg-primary-100 text-primary-600 border-primary-200"}
                                                `}
                                        onClick={() => clickTag(tag?.id!)}
                                    >{tag?.icon} {tag?.name}
                                    </button>
                                </li>)}
                            {query.loading &&
                                Array(8).fill(0).map((_, idx) => {

                                    return <div
                                        key={idx}
                                        className={`px-12 py-8 border bg-gray-100 hover:bg-gray-200 border-gray-200 rounded-10 text-body5 font-medium`}
                                    ><Skeleton width={`${Math.round(random(8, 15))}ch`} />
                                    </div>
                                })}
                        </ul>
                    </div>
                    <hr className="bg-gray-100" />
                    <div>
                        <h3 className="text-body2 font-bolder">📆 Founded</h3>
                        <p className='text-gray-600 mt-8'>Select the year you wish to see companies founded in.</p>
                        <div className="flex flex-wrap gap-48 mt-24">
                            {yearsFounded.map(year =>
                                <div key={year} className='flex gap-16 items-center'>
                                    <input
                                        name='yearFounded'
                                        value={year}
                                        checked={year === yearFoundedFilter}
                                        className='input-radio self-center'
                                        onChange={e => setYearFoundedFilter(e.target.value)}
                                        type="radio" />
                                    <label className="text-body4 text-gray-800" >
                                        {year}
                                    </label>
                                </div>)}
                        </div>
                    </div>

                    <div className="my-48"></div>
                    <div className='w-full bg-white content-container fixed bottom-0 left-0 py-24 border-t border-gray-200'>
                        <div className="flex justify-end gap-16">
                            <Button onClick={clearFilters}>Clear all</Button>
                            <Button color='primary' onClick={applyFilters}>Apply filters</Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
