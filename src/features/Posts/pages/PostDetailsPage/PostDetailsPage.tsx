
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'
import { Post_Type, usePostDetailsQuery } from 'src/graphql'
import { capitalize } from 'src/utils/helperFunctions'
import ScrollToTop from 'src/utils/routing/scrollToTop'
import TrendingCard from 'src/features/Posts/Components/TrendingCard/TrendingCard'
import AuthorCard from './Components/AuthorCard/AuthorCard'
import PageContent from './Components/PageContent/PageContent'
import PostActions from './Components/PostActions/PostActions'
import PostDetailsPageSkeleton from './PostDetailsPage.skeleton'
import styles from './styles.module.scss'
import { lazy, Suspense } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const CommentsSection = lazy(() => import( /* webpackChunkName: "comments_section" */ "src/features/Posts/Components/Comments"))

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
                className={`page-container`}
            >
                <div className={`grid w-full gap-32 ${styles.grid}`}>
                    <aside id='actions' className='no-scrollbar'>
                        <div className="sticky-side-element">
                            <PostActions post={post} />
                        </div>
                    </aside>


                    <PageContent post={post} />
                    <aside id='author' className='no-scrollbar min-w-0'>
                        <div className="flex flex-col gap-24 overflow-y-auto sticky-side-element">
                            <AuthorCard author={post.author} />
                            <div className="hidden md:block"><TrendingCard /></div>
                        </div>
                    </aside>
                    <div id="comments">
                        <Suspense fallback={
                            <div className="flex justify-center py-32"><RotatingLines strokeColor='#ddd' width="64" /></div>
                        }>
                            <CommentsSection id={post.id} type={type as Post_Type} />
                        </Suspense>
                        <div className="md:hidden mt-24"><TrendingCard /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
