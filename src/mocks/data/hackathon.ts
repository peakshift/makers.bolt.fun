import { random, randomItem, randomItems } from "src/utils/helperFunctions"
import { getCoverImage } from "./utils"

const topics = [
    {
        id: 1,
        title: '🎨 Design'
    },
    {
        id: 2,
        title: '💻 Hardware'
    },
    {
        id: 3,
        title: '⚡️ Lightning'
    },
    {
        id: 4,
        title: '🚀 Startups'
    },
    {
        id: 5,
        title: '💸 Bitcoin'
    },
]

const generateTopics = () => randomItems(
    Math.floor(random(1, 4)),
    ...topics
)


export const hackathons = [
    {
        id: 1,
        title: 'Fulmo Hackday',
        date: '22nd - 28th March, 2022',
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        topics: generateTopics(),
        url: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 2,
        title: 'Lightning Leagues',
        date: '22nd - 28th March, 2022',
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        topics: generateTopics(),
        url: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 3,
        title: 'Surfing on Lightning',
        date: '22nd - 28th March, 2022',
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        topics: generateTopics(),
        url: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 4,
        title: 'Lightning Startups',
        date: '22nd - 28th March, 2022',
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        topics: generateTopics(),
        url: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 5,
        title: 'Design-a-thon',
        date: '22nd - 28th March, 2022',
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        topics: generateTopics(),
        url: "https://bolt.fun/hackathons/shock-the-web"
    },
    {
        id: 6,
        title: 'Lightning Olympics',
        date: '22nd - 28th March, 2022',
        location: "Instanbul, Turkey",
        cover_image: getCoverImage(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam felis ut interdum commodo, scelerisque.",
        topics: generateTopics(),
        url: "https://bolt.fun/hackathons/shock-the-web"
    },
]