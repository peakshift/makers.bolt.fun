import { useMediaQuery } from 'src/utils/hooks';
import Skeleton from 'react-loading-skeleton';
import Slider from 'src/Components/Slider/Slider';
import { Tag, usePopularTagsQuery } from 'src/graphql';
import { MEDIA_QUERIES } from 'src/utils/theme';
import { capitalize } from 'src/utils/helperFunctions';
import Card from 'src/Components/Card/Card';

export type FilterTag = Pick<Tag, 'id' | 'title' | "icon">

interface Props {
    value: FilterTag | null,
    onChange?: (newFilter: FilterTag | null) => void
}

export default function PopularTagsFilter({ value, onChange }: Props) {


    const tagsQuery = usePopularTagsQuery();


    const filterClicked = (_newValue: FilterTag) => {
        const newValue = value?.id === _newValue.id ? null : _newValue
        onChange?.(newValue);
    }

    const selectedId = value?.id

    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)

    return (
        <div className='overflow-hidden'>
            {isMdScreen ?
                <Card>
                    <p className="text-body2 font-bolder text-black mb-16">Popular Tags</p>
                    <ul className=' flex flex-col gap-16'>
                        {tagsQuery.loading ?
                            Array(5).fill(0).map((_, idx) => <li
                                key={idx}
                                className={`flex items-start rounded-8 font-bold p-4`}

                            >
                                <span className='bg-gray-50 rounded-8 w-40 h-40 text-center py-8'> </span>
                                <span className="self-center px-16"><Skeleton width={'7ch'} />
                                </span>
                            </li>
                            )
                            :
                            tagsQuery.data?.popularTags.map((tag) => <li
                                key={tag.id}
                                className={`flex items-start rounded-8 cursor-pointer font-bold p-4
                                 active:scale-95 transition-transform
                                ${tag.id === selectedId ? 'bg-gray-200' : 'hover:bg-gray-100'}
                                `}
                                role='button'
                                onClick={() => filterClicked(tag)}
                            >
                                <span className={`${tag.id !== selectedId && 'bg-gray-50'} rounded-8 w-40 h-40 text-center py-8`}>{tag.icon}</span>
                                <span className="self-center px-16">
                                    {capitalize(tag.title)}
                                </span>
                            </li>)}
                    </ul>

                </Card>
                :
                <>
                    {
                        tagsQuery.loading ?
                            <ul className="flex gap-8 ">
                                {Array(4).fill(0).map((_, idx) => <div key={idx} className="py-12 px-16 bg-gray-100 rounded-8 text-body5"><span className="opacity-0">Category</span></div>)}
                            </ul>
                            :
                            <Slider>
                                {tagsQuery.data?.popularTags.map(tag =>
                                    <div
                                        key={tag.id}
                                        onClick={() => filterClicked(tag)}
                                        className={`${tag.id === selectedId ? 'bg-gray-200' : "bg-gray-100"} py-12 px-16 rounded-8 text-body5`}
                                    >{tag.icon} {tag.title}</div>)}
                            </Slider>
                    }
                </>
            }
        </div>


    )
}
