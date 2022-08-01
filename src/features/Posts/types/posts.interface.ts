import * as ApiTypes from "src/graphql"
import { Tag } from "src/utils/interfaces"

export type User = {
    id: number
    name: string
    avatar: string
}

export type Author = ApiTypes.Author


export type PostBase = ApiTypes.PostBase


export type Story = ApiTypes.Story

export function isStory(post: { type: string }): post is Story {
    return post.type === 'Story'
}


export type Bounty = ApiTypes.Bounty

export function isBounty(post: { type: string }): post is Bounty {
    return post.type === 'Bounty'
}

export type Question = ApiTypes.Question

export function isQuestion(post: { type: string }): post is Question {
    return post.type === 'Question'
}


export type PostComment = ApiTypes.PostComment

export type Post = Story | Question | Bounty
