
import { useReducer, useState } from 'react'
import { useFeedQuery } from 'src/graphql'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularCategories from './PopularCategories/PopularCategories'
import SortBy from './SortBy/SortBy'
import styles from './styles.module.scss'


export default function FeedPage() {

    const [sortByFilter, setSortByFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')


    const feedQuery = useFeedQuery({
        variables: {
            take: 10,
            skip: 0,
            sortBy: sortByFilter,
            category: categoryFilter
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
                    <hr className="my-24 bg-gray-100" />
                    <PopularCategories
                        filterChanged={setCategoryFilter}
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
