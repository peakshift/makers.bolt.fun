
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'
import { usePostDetailsQuery } from 'src/graphql'
import { capitalize } from 'src/utils/helperFunctions'
import { useAppSelector, } from 'src/utils/hooks'
import ScrollToTop from 'src/utils/routing/scrollToTop'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import AuthorCard from './Components/AuthorCard/AuthorCard'
import PageContent from './Components/PageContent/PageContent'
import PostActions from './Components/PostActions/PostActions'
import PostDetailsPageSkeleton from './PostDetailsPage.skeleton'
import styles from './styles.module.scss'


export default function PostDetailsPage() {

    const { type: _type, id } = useParams();
    const type = capitalize(_type);

    const postDetailsQuery = usePostDetailsQuery({
        variables: {
            id: Number(id!),
            type: type as any
        },
        skip: isNaN(Number(id)),
    })

    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    if (postDetailsQuery.loading)
        return <PostDetailsPageSkeleton />

    const post = postDetailsQuery.data?.getPostById;

    if (!post)
        return <NotFoundPage />

    return (
        <>
            <Helmet>
                <title>{post.title}</title>
                <meta property="og:title" content={post.title} />
            </Helmet>
            <ScrollToTop />
            <div
                className={`page-container grid pt-16 w-full gap-32 ${styles.grid}`}
            >
                <aside id='actions' className='no-scrollbar'>
                    <div className="sticky"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        }}>
                        <PostActions post={post} />
                    </div>
                </aside>


                <PageContent post={post} />
                <aside id='author' className='no-scrollbar min-w-0'>
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
        </>
    )
}
