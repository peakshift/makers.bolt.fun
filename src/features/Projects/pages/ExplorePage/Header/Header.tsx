
import { MdClose } from 'react-icons/md'
import ASSETS from 'src/assets'
import Badge from 'src/Components/Badge/Badge'
import { Category } from 'src/features/Projects/Components/Categories/Categories'
import { useProjectsFilters } from '../filters-context'
import { useAppSelector } from 'src/utils/hooks'

type Props = {
    selectedCategry: Category | null
}

export default function Header(props: Props) {

    const navHeight = useAppSelector(s => s.ui.navHeight)

    const { filters, filtersEmpty, removeFilter } = useProjectsFilters();

    const onCategoryPage = !!props.selectedCategry?.name;
    const onSearchPage = !onCategoryPage && !filtersEmpty


    const currentHeader = onCategoryPage ? 'category' : (filtersEmpty ? "all-default" : "all-search");


    const title = currentHeader === 'category' ? `${props.selectedCategry?.name} projects`
        : currentHeader === 'all-default' ? "Everything lightning network in one place"
            : currentHeader === 'all-search' ? "All lightning projects" : ""



    const subtitle = currentHeader === 'category' ? ""
        : currentHeader === 'all-default' ? "Use our searchable data platform to discover 1,542 lightning projects & companies"
            : currentHeader === 'all-search' ? "" : ""



    return (
        <div
            className='min-h-[280px] py-64 md:py-[120px]  rounded-20 overflow-hidden relative text-center flex flex-col justify-center items-center gap-8'
        >
            <div style={{ height: navHeight + 'px' }}></div>
            <img src={ASSETS.CoverImage} alt="" className='absolute inset-0 opacity-100 w-full h-full object-cover object-bottom z-[-1]' />
            <div className="content-container">
                <div className="flex flex-col justify-center items-center gap-16">
                    <h1
                        className='text-primary-500 text-h1 font-medium'
                    >{title}</h1>
                    {subtitle &&
                        <p className="text-body3 text-gray-900 font-medium">{subtitle}</p>
                    }
                    {currentHeader === 'all-default' && <>
                        <p className="text-body6 font-bolder text-gray-800 uppercase mt-8">Brought to you by</p>
                        <div className="flex justify-center flex-wrap gap-x-80 gap-y-12">
                            <a href="https://bolt.observer" target='_blank' rel="noreferrer" className='hover:scale-110 active:scale-95 transition-transform' >
                                <img src={ASSETS.BoltObserverLogoLight} className='h-32' alt="Bolt Observer Logo" />
                            </a>
                            <a href="https://peakshift.com" target='_blank' rel="noreferrer" className='hover:scale-110 active:scale-95 transition-transform' >
                                <img src={ASSETS.PeakshiftLogoLight} className='h-32' alt="Peakshift Logo" />
                            </a>
                        </div>
                    </>
                    }
                    {!filtersEmpty && <div className=" ">
                        <p className="text-gray-900 font-medium text-body3 mb-8 text-center">Filtered by</p>
                        <div className="flex gap-8 flex-wrap">
                            {filters?.categories && filters.categories.length > 0 && <Badge size='sm'>{filters.categories[0]?.icon && <i className={`fa-solid fa-${filters.categories[0]?.icon} mr-4 text-gray-700`}></i>} <span className='font-bold text-gray-700'>{filters.categories[0].name}</span> <button onClick={() => removeFilter("categories")} className='ml-4 text-gray-600 hover:scale-125'><MdClose /></button> </Badge>}
                            {filters?.tags && filters.tags.length > 0 && <Badge size='sm'>🏷️ <span className='font-bold text-gray-700'>{filters.tags.map(t => t.label).join(', ')}</span> <button onClick={() => removeFilter("tags")} className='ml-4 text-gray-600 hover:scale-125'><MdClose /></button> </Badge>}
                            {filters?.yearFounded && <Badge size='sm'>📆 Founded in <span className='font-bold text-gray-700'>{filters.yearFounded}</span> <button onClick={() => removeFilter("yearFounded")} className='ml-4 text-gray-600 hover:scale-125'><MdClose /></button> </Badge>}
                            {filters?.projectStatus && <Badge size='sm'>🌱 Status: <span className='font-bold text-gray-700'>{filters?.projectStatus}</span> <button onClick={() => removeFilter("projectStatus")} className='ml-4 text-gray-600 hover:scale-125'><MdClose /></button> </Badge>}
                            {filters?.projectLicense && <Badge size='sm'>💻 <span className='font-bold text-gray-700'>{filters.projectLicense}</span> <button onClick={() => removeFilter("projectLicense")} className='ml-4 text-gray-600 hover:scale-125'><MdClose /></button> </Badge>}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}


const mapTitle = {
    'category': ""
}