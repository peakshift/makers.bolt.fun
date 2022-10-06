
import { useNavigate } from 'react-router-dom';
import { useAllCategoriesQuery } from 'src/graphql';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCarousel } from 'src/utils/hooks';

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

export default function Categories() {

    const { viewportRef, scrollSlides, canScrollNext, canScrollPrev, isClickAllowed } = useCarousel({
        align: 'start', slidesToScroll: 2,
        containScroll: "trimSnaps",
    })
    const { data, loading } = useAllCategoriesQuery();
    const navigate = useNavigate();


    if (loading || !data)
        return <div className="flex gap-12">
            {Array(5).fill(0).map((_, idx) =>
                <div
                    key={idx}
                    className=' block p-16 rounded-16  bg-gray-100 active:scale-90 transition-transform'
                >
                    <span className="opacity-0">category</span>
                </div>
            )}
        </div>


    return (

        <div className="relative group">
            <div className="overflow-hidden" ref={viewportRef}>
                <div className="select-none w-full flex gap-16">
                    {data?.categoryList?.filter(c => c !== null).map((category, idx) =>
                        <button
                            key={category!.id}
                            onClick={() => { }}
                            className='min-w-max block p-16 rounded-16 hover:bg-gray-100 active:bg-gray-200 active:scale-90 transition-transform'
                            style={{ backgroundColor: colors[idx % colors.length] }}
                        >{category!.icon} {category!.name}</button>
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
