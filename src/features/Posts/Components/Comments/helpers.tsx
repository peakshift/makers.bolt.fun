import { Comment, CommentWithReplies } from "./types";


export function convertCommentsToTree(comments: Comment[]) {
    let tree: Record<Comment['id'], CommentWithReplies> = {};

    for (const comment of comments)
        tree[comment.id] = { ...comment, replies: [] }

    for (const comment of Object.values(tree)) {
        if (comment.parentId)
            tree[comment.parentId].replies = [...tree[comment.parentId].replies, comment]
    }

    // TODO
    // Sort the comments according to date

    return Object.values(tree).filter(node => !node.parentId);
}