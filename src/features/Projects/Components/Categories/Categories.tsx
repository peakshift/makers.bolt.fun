
import { useNavigate } from 'react-router-dom';
import { CategoryList, useAllCategoriesQuery, useGetFiltersQuery } from 'src/graphql';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCarousel } from 'src/utils/hooks';
import Skeleton from 'react-loading-skeleton';

const colors = [
    '#FDF2F8',
    '#F5F3FF',
    '#FEFCE8',
    '#F0FDF4',
    '#EFF6FF',
    '#FFFBEB',
    '#FEF2F2',
    '#FDF2F8',
    '#FFF7ED',
    '#F1F5F9'
]
export type Category = Pick<CategoryList, 'id' | 'name' | 'icon' | 'projectsCount'>

interface Props {
    filtersActive?: boolean;
    value: Category | null
    onChange?: (v: Category | null) => void
}

export default function Categories(props: Props) {

    const { viewportRef, scrollSlides, canScrollNext, canScrollPrev } = useCarousel({
        align: 'start', slidesToScroll: 2,
        containScroll: "trimSnaps",
    })
    const { data, loading } = useGetFiltersQuery();


    if (loading || !data)
        return <div className="flex overflow-hidden gap-32 border-b border-gray-200">
            {Array(15).fill(0).map((_, idx) =>
                <div
                    key={idx}
                    className='p-16 rounded-16'
                >
                    <Skeleton width="15ch" />
                </div>
            )}
        </div>


    return (
        <div className="relative group">
            <div className="overflow-hidden border-b border-gray-200" ref={viewportRef}>
                <div className="select-none w-full flex gap-32">
                    <button
                        onClick={() => {
                            props.onChange?.(null)
                        }}
                        className={`
                            text-body5 text-center flex flex-wrap gap-8 flex-col justify-end items-center font-medium py-16 min-w-max
                            ${props.value === null ? "text-primary-500 border-b-2 border-primary-500" : "text-gray-500"} 
                            `}
                    ><i className="fa-solid fa-table-cells-large"></i>    <span className='w-full'>All Projects</span></button>
                    {data.categoryList?.filter(v => !!v?.projectsCount && v.projectsCount !== '0').map((category, idx) => {

                        return <button
                            key={category!.id}
                            onClick={() => {
                                const isSame = props.value?.id === category?.id;
                                props.onChange?.(isSame ? null : category)
                            }}
                            className={`
                            text-body5 text-center flex flex-wrap gap-8 flex-col justify-end items-center font-medium  py-16 min-w-max
                            ${props.value?.id === category?.id ? "text-primary-500 border-b-2 border-primary-500" : "text-gray-500"} 
                            `}
                        ><i className={category?.icon ? `fa-solid fa-${category.icon}` : "fa-regular fa-circle-question"}></i>    <span className='w-full'>{category!.name} ({category?.projectsCount!})</span></button>
                    }
                    )}
                </div>
            </div>
            <button className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400 opacity-0 ${canScrollPrev && 'group-hover:opacity-100'} active:scale-90 transition-opacity border border-gray-200 shadow-md`} onClick={() => scrollSlides(-1)}>
                <FaChevronLeft />
            </button>
            <button className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center right-0 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400  opacity-0 ${canScrollNext && 'group-hover:opacity-100'} active:scale-90 transition-opacity border border-gray-200 shadow-md`} onClick={() => scrollSlides(1)}>
                <FaChevronRight />
            </button>
        </div>

    )

}
