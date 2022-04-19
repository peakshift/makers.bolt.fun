import { Tag } from "src/utils/interfaces"

export type User = {
    id: number
    name: string
    image: string
}

export type Author = User & {
    join_date?: string
}

export type PostBase = {
    id: number
    title: string
    date: string
    author: Author
    excerpt: string
    tags: Tag[]
    votes_count: number
    type: string
    body: string
}

export type Story = PostBase & {
    cover_image: string;
    comments_count: number
}

export function isStory(post: Post): post is Story {
    return post.type === 'Story'
}

export type Bounty = PostBase & {
    cover_image: string;
    reward_amount: number
    deadline: string
    applicants_count: number
    applicants: {
        author: Author
        workPlan: string
    }[]
}

export function isBounty(post: Post): post is Bounty {
    return post.type === 'Bounty'
}

export type Question = PostBase & {
    answers_count: number
    comments: PostComment[]
}

export function isQuestion(post: Post): post is Question {
    return post.type === 'Question'
}

export type PostComment = {
    id: number;
    author: Author
    date: string
    body: string
}

export type Post = Story | Question | Bounty
