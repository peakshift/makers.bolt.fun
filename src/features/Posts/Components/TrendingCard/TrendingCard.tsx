import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { useTrendingPostsQuery } from 'src/graphql'
import { random } from 'src/utils/helperFunctions'

export default function TrendingCard() {

    const trendingPosts = useTrendingPostsQuery()



    return (
        <div className="bg-white rounded-8 border p-16">
            <h3 className="text-body2 font-bolder mb-16">Trending on BOLT.FUN</h3>
            <ul className='flex flex-col gap-16'>
                {
                    trendingPosts.loading ?
                        Array(4).fill(0).map((_, idx) => <li key={idx} className="flex items-start gap-8">
                            <Skeleton circle width={24} height={24} />
                            <p className="text-body5 font-medium flex-grow"><Skeleton width={'80%'} />
                                <Skeleton width={`${random(30, 65)}%`} /></p>
                        </li>
                        )
                        :
                        trendingPosts.data?.getTrendingPosts.map(post => {
                            return <Link key={post.id} to={`/blog/post/${post.__typename}/${post.id}`} className="border-b pb-4 last-of-type:border-b-0">
                                <li className="flex items-start gap-8">
                                    <Avatar width={24} src={post.author.image} />
                                    <p className="text-body5 font-medium">{post.title}</p>
                                </li>
                            </Link>
                        }
                        )}
            </ul>
        </div>
    )
}
