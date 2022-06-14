import { Hackathon } from "src/graphql"
import { tags } from "./tags"
import { getCoverImage, getItems } from "./utils"


const generateTags = () => getItems(tags, {
    min: 1,
    max: 4
})


export const hackathons = [
    {
        id: 1,
        title: 'Fulmo Hackday',
        start_date: new Date(2022, 2, 22),
        end_date: new Date(2022, 2, 28),
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        tags: generateTags(),
        website: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 2,
        title: 'Lightning Leagues',
        start_date: new Date(2022, 2, 22),
        end_date: new Date(2022, 2, 28),
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        tags: generateTags(),
        website: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 3,
        title: 'Surfing on Lightning',
        start_date: new Date(2022, 2, 22),
        end_date: new Date(2022, 2, 28),
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        tags: generateTags(),
        website: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 4,
        title: 'Lightning Startups',
        start_date: new Date(2022, 2, 22),
        end_date: new Date(2022, 2, 28),
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        tags: generateTags(),
        website: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 5,
        title: 'Design-a-thon',
        start_date: new Date(2022, 2, 22),
        end_date: new Date(2022, 2, 28),
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        tags: generateTags(),
        website: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 6,
        title: 'Lightning Olympics',
        start_date: new Date(2022, 2, 22),
        end_date: new Date(2022, 2, 28),
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        tags: generateTags(),
        website: "https://bolt.fun/hackathons/shock-the-web"
    },
].map(i => ({ ...i, __typename: "Hackathon" })) as Hackathon[]