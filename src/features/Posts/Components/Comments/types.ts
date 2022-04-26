
import { Author } from "src/features/Posts/types";

export interface Comment {
    id: number
    author: Author
    created_at: string
    body: string
    votes_count: number
    parentId: number
}

export interface CommentWithReplies extends Comment {
    replies: CommentWithReplies[]
}