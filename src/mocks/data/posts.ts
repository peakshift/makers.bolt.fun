
import dayjs from "dayjs";
import { Bounty, Post, Question, Story } from "src/features/Posts/types";
import { getAvatarImage, getCoverImage } from "./utils";

const getAuthor = () => ({
    id: 12,
    name: "John Doe",
    image: getAvatarImage()
})

const date = dayjs().subtract(5, 'hour').toString();

export let posts = {
    stories: [
        {
            id: 1,
            title: 'Digital Editor, Mars Review of Books',
            cover_image: getCoverImage(),
            comments_count: 31,
            date,
            votes_count: 120,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            type: "story",
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
                { id: 3, title: "guide" },
            ],
            author: getAuthor()
        }
    ] as Story[],
    bounties: [
        {
            type: "bounty",
            id: 1,
            title: 'Digital Editor, Mars Review of Books',
            cover_image: getCoverImage(),
            applicants_count: 31,
            date,
            votes_count: 120,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
                { id: 3, title: "guide" },
            ],
            author: getAuthor(),
            deadline: "25 May",
            reward_amount: 200_000,
        }
    ] as Bounty[],
    questions: [
        {
            type: "question",
            id: 1,
            title: 'Digital Editor, Mars Review of Books',
            answers_count: 31,
            date,
            votes_count: 70,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
            ],
            author: getAuthor(),
            comments: [
                {
                    id: 1,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
                {
                    id: 2,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
            ]
        }
    ] as Question[]
}


posts.bounties = posts.bounties.map(b => ({ ...b, __typename: "Bounty" }))
posts.questions = posts.questions.map(b => ({ ...b, __typename: "Question" }))
posts.stories = posts.stories.map(b => ({ ...b, __typename: "Story" }))

export const feed: Post[] = [
    ...posts.stories,
    ...posts.bounties,
    ...posts.questions,
]

