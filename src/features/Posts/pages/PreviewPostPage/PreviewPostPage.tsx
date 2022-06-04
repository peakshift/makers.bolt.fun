
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import NotFoundPage from 'src/features/Shared/pages/NotFoundPage/NotFoundPage'
import { useAppSelector, } from 'src/utils/hooks'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import AuthorCard from '../PostDetailsPage/Components/AuthorCard/AuthorCard'
import PostActions from '../PostDetailsPage/Components/PostActions/PostActions'
import styles from '../PostDetailsPage/styles.module.scss';
import PreviewPostContent from './PreviewPostContent/PreviewPostContent'

function isPost(type?: string): type is 'story' {
    return type === 'story'
    // || type === 'question' || type === 'bounty'
}


export default function PreviewPostPage() {

    const { type: _type } = useParams()

    const type = _type?.toLowerCase();

    const { post, author, navHeight } = useAppSelector(state => ({
        post: isPost(type) ? state.staging[type] : null,
        author: state.user.me,
        navHeight: state.ui.navHeight
    }))



    if (!post)
        return <NotFoundPage />

    return (
        <>
            <Helmet>
                <title>{post.title}</title>
                <meta property="og:title" content={post.title} />
            </Helmet>
            <div
                className={`page-container grid pt-16 w-full gap-32 ${styles.grid}`}
            >
                <aside id='actions' className='no-scrollbar'>
                    <div className="sticky"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        }}>
                        <PostActions
                            post={{
                                id: 123,
                                votes_count: 123
                            }}
                            isPreview
                        />
                    </div>
                </aside>
                <PreviewPostContent post={{ ...post, createdAt: new Date().toISOString(), author: author! }} />
                <aside id='author' className='no-scrollbar min-w-0'>
                    <div className="flex flex-col gap-24"
                        style={{
                            top: `${navHeight + 16}px`,
                            maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                            overflowY: "scroll",
                        }}>
                        <AuthorCard author={author!} />
                        <TrendingCard />
                    </div>
                </aside>
            </div>
        </>
    )
}
