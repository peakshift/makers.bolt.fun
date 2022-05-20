
import { useReducer, useState } from 'react'
import { useFeedQuery } from 'src/graphql'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularTopicsFilter from './PopularTopicsFilter/PopularTopicsFilter'
import SortBy from './SortBy/SortBy'
import styles from './styles.module.scss'


export default function FeedPage() {

    const [sortByFilter, setSortByFilter] = useState('all')
    const [topicFilter, setTopicFilter] = useState<number | null>(null)


    const feedQuery = useFeedQuery({
        variables: {
            take: 3,
            skip: 0,
            sortBy: sortByFilter,
            topic: topicFilter
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
                    <SortBy
                        filterChanged={setSortByFilter}
                    />
                    <div className="my-24"></div>
                    <PopularTopicsFilter
                        filterChanged={setTopicFilter}
                    />
                </div>
            </aside>
            <PostsList
                isLoading={feedQuery.loading}
                items={feedQuery.data?.getFeed}
                isFetching={isFetchingMore}
                onReachedBottom={fetchMore}
            />
            <aside className='no-scrollbar'>
                <div className="sticky"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        overflowY: "scroll",
                    }}>
                    <TrendingCard />
                </div>
            </aside>
        </div>
    )
}
