import { Tag } from "src/graphql";


export const tags = [
    {
        id: 1,
        title: 'Bitcoin',
        icon: "🅱",
    },
    {
        id: 2,
        title: 'Lightning',
        icon: "⚡",
    },
    {
        id: 3,
        title: 'Webln',
        icon: "🔗",
    },
    {
        id: 4,
        title: 'Gaming',
        icon: "🎮",
    },
    {

        id: 5,
        title: 'Design',
        icon: '🎨'
    }
].map(i => ({ __typename: "Tag", ...i })) as Tag[]