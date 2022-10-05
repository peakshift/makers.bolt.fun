
import { useAppSelector, } from 'src/utils/hooks'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import AuthorCardSkeleton from './Components/AuthorCard/AuthorCard.skeleton'
import PageContentSkeleton from './Components/PageContent/PageContent.skeleton'
import PostActionsSkeleton from './Components/PostActions/PostActions.skeleton'
import styles from './styles.module.scss'


export default function PostDetailsPageSkeleton() {


    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (

        <div className="page-container max-md:bg-white">
            <div
                className={`grid pt-16 w-full gap-32 ${styles.grid}`}
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
        </div>
    )
}
