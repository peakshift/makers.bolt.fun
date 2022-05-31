
import { useUpdateEffect } from '@react-hookz/web'
import { useReducer, useState } from 'react'
import { Nullable } from 'remirror'
import { useFeedQuery } from 'src/graphql'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularTopicsFilter from './PopularTopicsFilter/PopularTopicsFilter'
import SortBy from './SortBy/SortBy'
import styles from './styles.module.scss'
import { Helmet } from "react-helmet";


export default function FeedPage() {

    const [sortByFilter, setSortByFilter] = useState<string | null>(null)
    const [topicFilter, setTopicFilter] = useState<number | null>(null)


    const feedQuery = useFeedQuery({
        variables: {
            take: 3,
            skip: 0,
            sortBy: sortByFilter,
            topic: topicFilter
        },
    })
    const { fetchMore, isFetchingMore, variablesChanged } = useInfiniteQuery(feedQuery, 'getFeed')
    useUpdateEffect(variablesChanged, [sortByFilter, topicFilter]);

    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (
        <>
            <Helmet>
                <title>{`Bolt.Fun Blog`}</title>
                <meta property="og:title" content={`Bolt.Fun Blog`} />
            </Helmet>
            <div
                className={`page-container pt-16 w-full ${styles.grid}`}
            >
                <aside className='no-scrollbar'>
                    <div className="sticky md:overflow-y-scroll"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
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
                <main>
                    <PostsList
                        isLoading={feedQuery.loading}
                        items={feedQuery.data?.getFeed}
                        isFetching={isFetchingMore}
                        onReachedBottom={fetchMore}
                    />
                </main>
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
        </>
    )
}
