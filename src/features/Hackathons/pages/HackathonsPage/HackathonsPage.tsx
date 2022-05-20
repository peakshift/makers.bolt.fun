
import { useReducer, useState } from 'react'
import { useFeedQuery } from 'src/graphql'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import SortByFilter from '../../Components/SortByFilter/SortByFilter'
import TopicsFilter from '../../Components/TopicsFilter/TopicsFilter'
import styles from './styles.module.scss'


export default function HackathonsPage() {

    const [sortByFilter, setSortByFilter] = useState('all')
    const [topicsFilter, setTopicsFilter] = useState('all')


    const feedQuery = useFeedQuery({
        variables: {
            take: 10,
            skip: 0,
            sortBy: sortByFilter,
            topic: Number(topicsFilter)
        },
    })
    const { fetchMore, isFetchingMore } = useInfiniteQuery(feedQuery, 'getFeed')
    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (
        <div
            className={`page-container pt-16 w-full ${styles.grid}`}
        >
            <aside className='no-scrollbar'>
                <div className="sticky"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        overflowY: "scroll",
                    }}>
                    <SortByFilter
                        filterChanged={setSortByFilter}
                    />
                    <TopicsFilter
                        filterChanged={setTopicsFilter}
                    />
                </div>
            </aside>

        </div>
    )
}
