import { Post } from "src/features/Posts/types"
import PostCard from "../PostCard/PostCard"

interface Props {
    posts: Post[]
}

export default function PostsList(props: Props) {
    return (
        <div className="flex flex-col gap-24">
            {
                props.posts.map(post => <PostCard key={post.id} post={post} />)
            }
        </div>
    )
}
