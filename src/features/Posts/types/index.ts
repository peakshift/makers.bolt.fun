import { Tag } from "src/utils/interfaces"

export type PostBase = {
    id: number
    title: string
    date: string
    author: {
        id: number
        name: string
        image: string
    }
    excerpt: string
    tags: Tag[]
    votes_count: number
}

export type Story = PostBase & {
    type: 'story'
    cover_image: string;
    comments_count: number
}

export type Bounty = PostBase & {
    type: 'bounty'
    cover_image: string;
    reward_amount: number
    deadline: string
    applicants_count: number
}

export type Question = PostBase & {
    type: 'question'
    answers_count: number
}

export type Post = Story | Question | Bounty
