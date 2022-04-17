import { Post } from "src/features/Posts/types"
import { useFeedQuery } from "src/graphql"
import PostCard from "../PostCard/PostCard"

interface Props {
    posts: Post[]
}

export default function PostsList(props: Props) {

    const { data, loading } = useFeedQuery()
    if (loading) return <h2>Loading</h2>
    return (
        <div className="flex flex-col gap-24">
            {
                data?.getFeed.map(post => <PostCard key={post.id} post={post} />)
            }
        </div>
    )
}
