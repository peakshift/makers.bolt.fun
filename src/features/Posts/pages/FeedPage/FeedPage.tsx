
import { useFeedQuery } from 'src/graphql'
import { MOCK_DATA } from 'src/mocks/data'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import PopularCategories from './PopularCategories/PopularCategories'
import SortBy from './SortBy/SortBy'
import styles from './styles.module.css'

export default function FeedPage() {

    const feedQuery = useFeedQuery()

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
            <PostsList isLoading={feedQuery.loading} items={feedQuery.data?.getFeed} />
            <aside>
                <div className="sticky top-16">
                    <TrendingCard />
                </div>
            </aside>
        </div>
    )
}
