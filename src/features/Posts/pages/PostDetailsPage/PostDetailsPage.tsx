
import { useFeedQuery } from 'src/graphql'
import { MOCK_DATA } from 'src/mocks/data'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import AuthorCard from './Components/AuthorCard/AuthorCard'
import PageContent from './Components/PageContent/PageContent'
import PostActions from './Components/PostActions/PostActions'
import styles from './styles.module.css'


export default function PostDetailsPage() {

    // const feedQuery = useFeedQuery({
    //     variables: {
    //         take: 10,
    //         skip: 0
    //     },
    // })
    // const { fetchMore, isFetchingMore } = useInfiniteQuery(feedQuery, 'getFeed')
    const post = MOCK_DATA.posts.stories[0]
    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (
        <div
            className={`page-container grid pt-16 w-full gap-32 ${styles.grid}`}
        >
            <aside className='no-scrollbar'>
                <div className="sticky"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        overflowY: "scroll",
                    }}>
                    <PostActions />
                </div>
            </aside>


            <PageContent post={post} />
            <aside className='no-scrollbar'>
                <div className="flex flex-col gap-24"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        overflowY: "scroll",
                    }}>
                    <AuthorCard author={post.author} />
                    <TrendingCard />
                </div>
            </aside>
        </div>
    )
}
