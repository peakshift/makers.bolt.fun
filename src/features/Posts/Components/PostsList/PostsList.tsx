import { useCallback } from "react"
import { Post } from "src/features/Posts/types"
import { useReachedBottom } from "src/utils/hooks/useReachedBottom"
import { ListProps } from "src/utils/interfaces"
import PostCard, { PostCardSkeleton } from "../PostCard"

type Props = ListProps<Post>

export default function PostsList(props: Props) {


    const reachedBottom = useCallback(() => {
        console.log("NEW FETCH")
    }, [])

    const { ref } = useReachedBottom<HTMLDivElement>(reachedBottom)

    if (props.isLoading)
        return <div className="flex flex-col gap-24">
            {<>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </>
            }
        </div>

    return (
        <div ref={ref} className="flex flex-col gap-24">
            {
                props.items?.map(post => <PostCard key={post.id} post={post} />)
            }
            {props.isFetching && <PostCardSkeleton />}
        </div>
    )
}
