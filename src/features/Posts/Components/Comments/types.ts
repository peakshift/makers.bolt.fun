
import { Author } from "src/features/Posts/types";

export interface Comment {
    id: string | number,
    pubkey: string;
    author?: Pick<Author, 'id' | 'name' | 'avatar'>;
    body: any;
    created_at: number;
    replies: Comment[]
}

export interface CommentWithReplies extends Comment {
    replies: CommentWithReplies[]
}

