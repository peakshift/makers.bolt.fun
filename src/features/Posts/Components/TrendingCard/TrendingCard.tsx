import { Link } from 'react-router-dom'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { useTrendingPostsQuery } from 'src/graphql'

export default function TrendingCard() {

    const trendingPosts = useTrendingPostsQuery()

    if (trendingPosts.loading)
        return <></>

    console.log(trendingPosts.data?.getTrendingPosts);


    return (
        <div className="bg-white rounded-8 border p-16">
            <h3 className="text-body2 font-bolder mb-16">Trending on BOLT.FUN</h3>
            <ul className='flex flex-col gap-16'>
                {trendingPosts.data?.getTrendingPosts.map(post => {
                    console.log(post);

                    return <Link key={post.id} to={`/post-details-page/${post.id}`} className="border-b pb-4 last-of-type:border-b-0">
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
