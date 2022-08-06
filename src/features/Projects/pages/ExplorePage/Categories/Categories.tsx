
import useEmblaCarousel from 'embla-carousel-react'
import { useNavigate } from 'react-router-dom';
import { useAllCategoriesQuery } from 'src/graphql';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCallback } from 'react';

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

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', slidesToScroll: 2 })
    const { data, loading } = useAllCategoriesQuery();
    const navigate = useNavigate();

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

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
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="select-none w-full flex gap-16">
                    {data?.allCategories.map((category, idx) =>
                        <button
                            key={category.id}
                            onClick={() => emblaApi?.clickAllowed() && navigate(`/apps/category/${category.id}`)}
                            className='min-w-max block p-16 rounded-16 hover:bg-gray-100 active:bg-gray-200 active:scale-90 transition-transform'
                            style={{ backgroundColor: colors[idx % colors.length] }}
                        >{category.icon} {category.title}</button>
                    )}
                </div>
            </div>
            <button className="absolute inset-y-0 w-42 left-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-12 bg-gradient-to-r from-gray-700 text-white" onClick={scrollPrev}>
                <FaChevronLeft />
            </button>
            <button className="absolute inset-y-0 w-42 right-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-12 bg-gradient-to-l from-gray-700 text-white" onClick={scrollNext}>
                <FaChevronRight />
            </button>
        </div>

    )

}
