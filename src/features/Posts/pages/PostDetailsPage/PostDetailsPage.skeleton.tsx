
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import LoadingPage from 'src/Components/LoadingPage/LoadingPage'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'
import { usePostDetailsQuery } from 'src/graphql'
import { capitalize } from 'src/utils/helperFunctions'
import { useAppSelector, } from 'src/utils/hooks'
import { PostCardSkeleton } from '../../Components/PostCard'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import AuthorCard from './Components/AuthorCard/AuthorCard'
import AuthorCardSkeleton from './Components/AuthorCard/AuthorCard.skeleton'
import PageContent from './Components/PageContent/PageContent'
import PageContentSkeleton from './Components/PageContent/PageContent.skeleton'
import PostActions from './Components/PostActions/PostActions'
import PostActionsSkeleton from './Components/PostActions/PostActions.skeleton'
import styles from './styles.module.scss'


export default function PostDetailsPageSkeleton() {


    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (

        <div
            className={`page-container grid pt-16 w-full gap-32 ${styles.grid}`}
        >
            <aside id='actions' className='no-scrollbar'>
                <div className="sticky"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                    }}>
                    <PostActionsSkeleton />
                </div>
            </aside>


            <PageContentSkeleton />
            <aside id='author' className='no-scrollbar min-w-0'>
                <div className="flex flex-col gap-24"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        overflowY: "scroll",
                    }}>
                    <AuthorCardSkeleton />
                    <TrendingCard />
                </div>
            </aside>
        </div>
    )
}
