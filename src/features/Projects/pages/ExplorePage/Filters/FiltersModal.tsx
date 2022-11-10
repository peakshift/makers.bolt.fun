import { useState } from 'react'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'
import { useAppDispatch, useMediaQuery } from 'src/utils/hooks'
import { PayloadAction } from '@reduxjs/toolkit'
import IconButton from 'src/Components/IconButton/IconButton'
import { GetFiltersQuery, useGetFiltersQuery } from 'src/graphql'
import Skeleton from 'react-loading-skeleton';
import { random } from 'src/utils/helperFunctions';
import { MEDIA_QUERIES } from 'src/utils/theme'

interface Props extends ModalCard {
    initFilters?: Partial<ProjectsFilters>
    callbackAction: PayloadAction<Partial<ProjectsFilters>>
}


export interface IFormInputs {
    text: string,
    href: string,
}

type FilterCategory = NonNullable<NonNullable<GetFiltersQuery['categoryList']>[number]>

export type ProjectsFilters = {
    categories: FilterCategory[]
    tags: { id: string, label: string }[]
    yearFounded: typeof yearsFoundedOptions[number]['value'],
    projectStatus: typeof projectStatusOptions[number]['value']
    projectLicense: typeof licensesOptions[number]['value']
}


export default function FiltersModal({ onClose, direction, initFilters, callbackAction, ...props }: Props) {

    const dispatch = useAppDispatch()
    const query = useGetFiltersQuery();

    const [categoriesFilter, setCategoriesFilter] = useState(initFilters?.categories ?? []);
    const [tagsFilter, setTagsFilter] = useState(initFilters?.tags ?? []);
    const [yearFoundedFilter, setYearFoundedFilter] = useState(initFilters?.yearFounded ?? "any");
    const [projectStatusFilter, setProjectStatusFilter] = useState(initFilters?.projectStatus ?? "any");
    const [projectLicenseFilter, setProjectLicenseFilter] = useState(initFilters?.projectLicense ?? "any");

    const clickCategory = (value: FilterCategory) => {
        if (categoriesFilter.some(v => v.id === value.id))
            setCategoriesFilter([]);
        else
            setCategoriesFilter([value]);
    }

    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)



    const clickTag = (value: { id: string, label: string }) => {
        if (tagsFilter.some(v => v.id === value.id))
            setTagsFilter(tagsFilter.filter(v => v.id !== value.id));
        else
            setTagsFilter([...tagsFilter, value]);
    }

    const createActionPayload = (filters: Partial<ProjectsFilters>) => {
        const action = Object.assign({}, callbackAction);
        let payload: any = {};
        for (const [key, value] of Object.entries(filters)) {
            if (filters[(key as keyof typeof filters)] != null) payload[key] = value;
        }
        action.payload = payload;
        return action
    }

    const applyFilters = () => {
        dispatch(createActionPayload({
            categories: categoriesFilter,
            tags: tagsFilter,
            yearFounded: yearFoundedFilter,
            projectStatus: projectStatusFilter,
            projectLicense: projectLicenseFilter
        }))
        onClose?.();
    }


    const clearFilters = () => {
        dispatch(dispatch(createActionPayload({ categories: [], tags: [], yearFounded: 'any', projectStatus: 'any', projectLicense: "any" })))
        onClose?.();
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card min-h-screen !rounded-0 relative"
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
                        <p className='text-gray-600 mt-8'>Select a category to search from.</p>
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
                                                ${!categoriesFilter.some(f => f.id === category?.id!) ? "bg-gray-100 hover:bg-gray-200 border-gray-200" : "bg-primary-100 text-primary-600 border-primary-200"}
                                                `}
                                        onClick={() => clickCategory(category!)}
                                    >{category?.icon && <i className={`fa-solid fa-${category?.icon} mr-8 text-gray-700`}></i>} {category?.name}
                                    </button>
                                </li>)}
                            {query.loading &&
                                Array(10).fill(0).map((_, idx) => {
                                    return <div
                                        key={idx}
                                        className={`px-12 py-8 border bg-gray-100 border-gray-200 rounded-10 text-body5 font-medium`}
                                    ><Skeleton width="10ch" />
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
                                                ${!tagsFilter.some(f => f.id === tag?.id!) ? "bg-gray-100 hover:bg-gray-200 border-gray-200" : "bg-primary-100 text-primary-600 border-primary-200"}
                                                `}
                                        onClick={() => clickTag({ id: tag?.id!, label: tag?.name! })}
                                    >{tag?.name}
                                    </button>
                                </li>)}
                            {query.loading &&
                                Array(8).fill(0).map((_, idx) => {

                                    return <div
                                        key={idx}
                                        className={`px-12 py-8 border bg-gray-100 border-gray-200 rounded-10 text-body5 font-medium`}
                                    ><Skeleton width="10ch" />
                                    </div>
                                })}
                        </ul>
                    </div>
                    <hr className="bg-gray-100" />
                    <div>
                        <h3 className="text-body2 font-bolder">📆 Founded</h3>
                        <p className='text-gray-600 mt-8'>Select the year you wish to see companies founded in.</p>
                        <div className="flex flex-wrap gap-x-48 gap-y-24 mt-24">
                            {yearsFoundedOptions.map(year =>
                                <label key={year.text} className='flex gap-16 items-center'>
                                    <input
                                        name='yearFounded'
                                        value={year.value}
                                        checked={year.value === yearFoundedFilter}
                                        className='input-radio self-center'
                                        onChange={e => setYearFoundedFilter(e.target.value as typeof year.value)}
                                        type="radio" />
                                    <span className="text-body4 text-gray-800">{year.text}</span>
                                </label>)}
                        </div>
                    </div>

                    <hr className="bg-gray-100" />
                    <div>
                        <h3 className="text-body2 font-bolder">💙 Project status</h3>
                        <p className='text-gray-600 mt-8'>Select an option from below.</p>
                        <div className="flex flex-wrap gap-x-48 gap-y-24 mt-24">
                            {projectStatusOptions.map(status =>
                                <label key={status.text} className='flex gap-16 items-center'>
                                    <input
                                        name='projectStatus'
                                        value={status.value}
                                        checked={status.value === projectStatusFilter}
                                        className='input-radio self-center'
                                        onChange={e => setProjectStatusFilter(e.target.value as typeof status.value)}
                                        type="radio" />
                                    <span className="text-body4 text-gray-800">{status.text}</span>
                                </label>)}
                        </div>
                    </div>


                    <hr className="bg-gray-100" />
                    <div>
                        <h3 className="text-body2 font-bolder">💻 License type</h3>
                        <p className='text-gray-600 mt-8'>What type of license does this open source project have?</p>
                        <div className="flex flex-wrap gap-16 mt-24">
                            {licensesOptions.map(license =>
                                <button
                                    key={license.value}
                                    className={`
                                                px-12 py-8 border rounded-10 text-body5 font-medium
                                                active:scale-95 transition-transform
                                                ${projectLicenseFilter !== license.value ? "bg-gray-100 hover:bg-gray-200 border-gray-200" : "bg-primary-100 text-primary-600 border-primary-200"}
                                                `}
                                    onClick={() => setProjectLicenseFilter(license.value)}
                                >{license.text}
                                </button>)}
                        </div>
                    </div>

                    <div className="my-48"></div>
                    <div className='content-container w-full bg-white content-container fixed z-10 bottom-0 left-0 py-24 border-t border-gray-200'>
                        <div className="flex justify-between gap-16">
                            <Button size={isMdScreen ? 'md' : 'sm'} onClick={clearFilters}>Clear <span className="hidden md:inline">all</span></Button>
                            <div className="flex gap-16">
                                <Button size={isMdScreen ? 'md' : 'sm'} onClick={onClose}>Cancel</Button>
                                <Button size={isMdScreen ? 'md' : 'sm'} color='primary' onClick={applyFilters}>Apply <span className="hidden md:inline">filters</span></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}


const yearsFoundedOptions = [
    { value: "any", text: "Any" },
    { value: "2016", text: "2016" },
    { value: "2017", text: "2017" },
    { value: "2018", text: "2018" },
    { value: "2019", text: "2019" },
    { value: "2020", text: "2020" },
    { value: "2021", text: "2021" },
    { value: "2022", text: "2022" },
] as const

const projectStatusOptions = [
    { value: "any", text: "Any" },
    { value: 'alive', text: "Alive  🌱" },
    { value: 'dead', text: "RIP  💀" },
] as const

const licensesOptions = [
    { value: "any", text: "Any" },
    { value: 'MIT License', text: "MIT License" },
    { value: 'ISC License', text: "ISC License" },
    { value: 'Public domain', text: "Public domain" },
    { value: 'Apache License 2.0', text: "Apache License 2.0" },
    { value: 'GNU General Public License v2.0', text: "GNU General Public License v2.0" },
    { value: 'GNU General Public License v3.0', text: "GNU General Public License v3.0" },
    { value: 'Creative Commons Zero v1.0 Universal', text: "Creative Commons Zero v1.0 Universal" },
    { value: 'GNU Affero General Public License v3.0', text: "GNU Affero General Public License v3.0" },
    { value: 'Other', text: "Other" },
] as const