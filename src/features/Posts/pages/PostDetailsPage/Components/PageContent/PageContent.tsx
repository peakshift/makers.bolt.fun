import Header from "src/features/Posts/Components/PostCard/Header/Header"
import { Post } from "src/features/Posts/types"


interface Props {
    post: Post
}

export default function PageContent({ post }: Props) {
    return (
        <div>
            <Header size="lg" showTimeAgo={false} author={post.author} date={post.date} />
        </div>
    )
}
