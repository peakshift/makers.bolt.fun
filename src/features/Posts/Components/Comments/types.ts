
import { Author } from "src/features/Posts/types";

export interface Comment {
    id: number
    author: Author
    createdAt: string
    body: string
    votes_count: number
    parentId: number | null
}

export interface CommentWithReplies extends Comment {
    replies: CommentWithReplies[]
}

