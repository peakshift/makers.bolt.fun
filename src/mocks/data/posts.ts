
import dayjs from "dayjs";
import { Bounty, Post, Question, Story } from "src/features/Posts/types";
import { random, randomItem } from "src/utils/helperFunctions";
import { getAvatarImage, getCoverImage } from "./utils";
import { Chance } from 'chance'

const getDate = () => dayjs().subtract(random(5, 48), 'hour').toString();

const getAuthor = () => ({
    id: 12,
    name: "John Doe",
    image: getAvatarImage(),
    join_date: getDate()
})

export const generatePostComments = (cnt: number = 1): Story['comments'] => {

    let comments = [];
    const rootCommentsIds: any[] = []
    for (let i = 0; i < cnt; i++) {
        const parentId = Math.random() < .4 ? null : rootCommentsIds.length ? randomItem(...rootCommentsIds) : null;
        const comment = {
            id: i + 1,
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, at ut sit id. Vulputate aliquet aliquam penatibus ac, et dictum est etiam. Sagittis odio dui sed viverra donec rutrum iaculis vitae morbi.",
            created_at: getDate(),
            author: getAuthor(),
            votes_count: 123,
            parentId
        }
        comments.push(comment);
        if (!parentId)
            rootCommentsIds.push(comment.id);

    }
    return comments;
}

const getApplications = (cnt: number = 1): Bounty['applications'] => Array(cnt).fill(0).map((_, idx) => ({
    id: idx + 1,
    workplan: "I Plan to build this using React, Ts, Redux, and Storybook.",
    date: getDate(),
    author: getAuthor(),
}))

const postBody = `
[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

### **Why Markdown?**

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

A simple markdown editor with preview, implemented with React.js and TypeScript. This React Component aims to provide a simple Markdown editor with syntax highlighting support. This is based on \`textarea\` encapsulation, so it does not depend on any modern code editors such as Acs, CodeMirror, Monaco etc.

![Cover Image](${getCoverImage()})

### **How To Use The Demo**

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.


Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/


`


export let posts = {
    stories: [
        {
            id: 4,
            title: 'Digital Editor, Mars Review of Books',
            body: postBody,
            cover_image: getCoverImage(),
            comments_count: 31,
            date: getDate(),
            votes_count: 120,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            type: "Story",
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
                { id: 3, title: "guide" },
            ],
            author: getAuthor(),
            comments: generatePostComments(),

        },
    ] as Story[],
    bounties: [
        {
            type: "Bounty",
            id: 22,
            title: 'Digital Editor, Mars Review of Books',
            body: postBody,
            cover_image: getCoverImage(),
            applicants_count: 31,
            date: getDate(),
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
            applications: getApplications(2),

        }
    ] as Bounty[],
    questions: [
        {
            type: "Question",
            id: 33,
            title: 'Digital Editor, Mars Review of Books',
            body: postBody,
            answers_count: 31,
            date: getDate(),
            votes_count: 70,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
            ],
            author: getAuthor(),
            comments: generatePostComments(3)
        },
    ] as Question[]
}


posts.bounties = posts.bounties.map(b => ({ ...b, __typename: "Bounty" }))
posts.questions = posts.questions.map(b => ({ ...b, __typename: "Question" }))
posts.stories = posts.stories.map(b => ({ ...b, __typename: "Story" }))


const feedRandomer = new Chance('feed')

export const feed: Post[] = Array(30).fill(0).map((_, idx) => {
    const post = feedRandomer.pickone([posts.bounties[0], posts.questions[0], posts.stories[0]])

    return {
        ...post,
        id: idx + 1,
        title: feedRandomer.sentence({
            words: feedRandomer.integer({ min: 4, max: 7 })
        }),
        date: getDate(),
    }
})
