
import { Author } from "src/features/Posts/types";

export interface Comment {
    id: number,
    nostr_id: string;
    pubkey: string;
    author?: Pick<Author, 'id' | 'name' | 'avatar'>;
    body: any;
    created_at: number;
    replies: Comment[]
    votes_count: number
}

export interface CommentWithReplies extends Comment {
    replies: CommentWithReplies[]
}

