import { Tag } from "src/graphql";


export const tags = [
    {
        id: 1,
        title: 'Bitcoin',
        description: 'Lorem ipsum dolor sit amort consectetur, adipisicing elit. Possimus officia sit numquam nobis iure atque ab sunt nihil voluptatibus',
        icon: "🅱",
        isOfficial: true,
    },
    {
        id: 2,
        title: 'Lightning',
        description: 'Lorem ipsum dolor sit amort consectetur, adipisicing elit. Possimus officia sit numquam nobis iure atque ab sunt nihil voluptatibus',
        icon: "⚡",
        isOfficial: true,
    },
    {
        id: 3,
        title: 'Webln',
        description: 'Lorem ipsum dolor sit amort consectetur, adipisicing elit. Possimus officia sit numquam nobis iure atque ab sunt nihil voluptatibus',
        icon: "🔗",
        isOfficial: true,
    },
    {
        id: 4,
        title: 'Gaming',
        description: 'Lorem ipsum dolor sit amort consectetur, adipisicing elit. Possimus officia sit numquam nobis iure atque ab sunt nihil voluptatibus',
        icon: "🎮",
        isOfficial: true,
    },
    {

        id: 5,
        title: 'Design',
        description: 'Lorem ipsum dolor sit amort consectetur, adipisicing elit. Possimus officia sit numquam nobis iure atque ab sunt nihil voluptatibus',
        icon: '🎨',
        isOfficial: true,
    }
].map(i => ({ __typename: "Tag", ...i })) as Tag[]