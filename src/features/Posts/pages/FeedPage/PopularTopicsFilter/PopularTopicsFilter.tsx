import { useMediaQuery } from 'src/utils/hooks';
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import Slider from 'src/Components/Slider/Slider';
import { usePopularTopicsQuery } from 'src/graphql';
import { MEDIA_QUERIES } from 'src/utils/theme';


interface Props {
    filterChanged?: (newFilter: number | null) => void
}

export default function PopularTopicsFilter({ filterChanged }: Props) {

    const [selected, setSelected] = useState<number | null>(null);

    const topicsQuery = usePopularTopicsQuery();


    const filterClicked = (_newValue: number) => {
        const newValue = selected !== _newValue ? _newValue : null;
        setSelected(newValue);
        filterChanged?.(newValue);
    }

    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)

    return (
        <div className='overflow-hidden'>
            {isMdScreen ?
                <div className='bg-white border-2 border-gray-100 rounded-12 p-16'>
                    <p className="text-body2 font-bolder text-black mb-16">Explore Categories</p>
                    <ul className=' flex flex-col gap-16'>
                        {topicsQuery.loading ?
                            Array(3).fill(0).map((_, idx) => <li
                                key={idx}
                                className={`flex items-start rounded-8 font-bold`}

                            >
                                <span className='bg-gray-50 rounded-8 w-40 h-40 text-center py-8'> </span>
                                <span className="self-center px-16"><Skeleton width={'7ch'} />
                                </span>
                            </li>
                            )
                            :
                            topicsQuery.data?.popularTopics.map((topic, idx) => <li
                                key={topic.id}
                                className={`flex items-start rounded-8 cursor-pointer font-bold 
                                 active:scale-95 transition-transform
                                ${topic.id === selected ? 'bg-gray-200' : 'hover:bg-gray-100'}
                                `}
                                role='button'
                                onClick={() => filterClicked(topic.id)}
                            >
                                <span className={`${topic.id !== selected && 'bg-gray-50'} rounded-8 w-40 h-40 text-center py-8`}>{topic.icon}</span>
                                <span className="self-center px-16">
                                    {topic.title}
                                </span>
                            </li>)}
                    </ul>
                </div>
                :
                <>
                    {
                        topicsQuery.loading ?
                            <ul className="flex gap-8 ">
                                {Array(4).fill(0).map((_, idx) => <div key={idx} className="py-12 px-16 bg-gray-100 rounded-8 text-body5"><span className="opacity-0">Category</span></div>)}
                            </ul>
                            :
                            <Slider>
                                {topicsQuery.data?.popularTopics.map(topic =>
                                    <div
                                        key={topic.id}
                                        onClick={() => filterClicked(topic.id)}
                                        className={`${topic.id === selected ? 'bg-gray-200' : "bg-gray-100"} py-12 px-16 rounded-8 text-body5`}
                                    >{topic.icon} {topic.title}</div>)}
                            </Slider>
                    }
                </>
            }
        </div>


    )
}
