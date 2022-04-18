
import { useFeedQuery } from 'src/graphql'
import { useInfiniteQuery } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularCategories from './PopularCategories/PopularCategories'
import SortBy from './SortBy/SortBy'
import styles from './styles.module.css'


export default function FeedPage() {

    const feedQuery = useFeedQuery({
        variables: {
            take: 10,
            skip: 0
        }
    })
    const { fetchMore, isFetchingMore } = useInfiniteQuery(feedQuery, 'getFeed')

    return (
        <div
            className={`page-container grid w-full gap-32 ${styles.grid}`}
        >
            <aside>
                <div className="sticky top-16">
                    <SortBy />
                    <hr className="my-24 bg-gray-100" />
                    <PopularCategories />
                </div>
            </aside>
            <PostsList
                isLoading={feedQuery.loading}
                items={feedQuery.data?.getFeed}
                isFetching={isFetchingMore}
                onReachedBottom={fetchMore}
            />
            <aside>
                <div className="sticky top-16">
                    <TrendingCard />
                </div>
            </aside>
        </div>
    )
}
