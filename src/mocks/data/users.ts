import { Chance } from "chance";
import { GenericMakerRole, MakerSkill, MyProfile, RoleLevelEnum, User } from "src/graphql";
import { randomItem, randomItems } from "src/utils/helperFunctions";
import { posts } from "./posts";
import { getCoverImage, getAvatarImage } from "./utils";

const chance = new Chance();
export const allMakersRoles: GenericMakerRole[] = [
    {
        id: 1,
        title: "Frontend Dev",
        icon: "💄"
    },
    {
        id: 2,
        title: "Backend Dev",
        icon: "💻️"
    }, {
        id: 3,
        title: "UI/UX Designer",
        icon: "🌈️️"
    },
    {
        id: 4,
        title: "Community Manager",
        icon: "🎉️️"
    },
    {
        id: 5,
        title: "Founder",
        icon: "🦄️"
    },
    {
        id: 6,
        title: "Marketer",
        icon: "🚨️"
    },
    {
        id: 7,
        title: "Content Creator",
        icon: "🎥️"
    },
    {
        id: 8,
        title: "Researcher",
        icon: "🔬"
    },
    {
        id: 9,
        title: "Data engineer",
        icon: "💿️"
    },
    {
        id: 10,
        title: "Growth hacker",
        icon: "📉️"
    },
    {
        id: 11,
        title: "Technical Writer",
        icon: "✍️️"
    },
]

export const allMakersSkills: MakerSkill[] = [
    {
        id: 1,
        title: "Figma"
    },
    {
        id: 2,
        title: "Prototyping"
    }, {
        id: 3,
        title: "Writing"
    }, {
        id: 4,
        title: "CSS"
    }, {
        id: 5,
        title: "React.js"
    }, {
        id: 6,
        title: "Wordpress"
    }, {
        id: 7,
        title: "Principle app"
    }, {
        id: 8,
        title: "UX design"
    }, {
        id: 9,
        title: "User research"
    }, {
        id: 10,
        title: "User testing"
    },
]

export const user: User & MyProfile = {
    id: 123,
    email: "mtg0987654321@gmail.com",
    avatar: "https://avatars.dicebear.com/api/bottts/Mtgmtg.svg",
    bio: "Lorem asiop asklh kluiw wekjhl shkj kljhsva klu khsc klhlkbs mjklwqr kmlk sadlfui mewr qiumnk, asdjomi cskhsdf.",
    name: "Mtg",
    github: "MTG2000",
    jobTitle: "Front-end Web Developer",
    join_date: new Date(2021).toISOString(),
    lightning_address: "mtg@getalby.com",
    linkedin: "https://www.linkedin.com/in/mtg-softwares-dev/",
    location: "Germany, Berlin",
    role: "user",
    twitter: "mtg",
    website: "https://mtg-dev.tech",
    stories: posts.stories,
    nostr_prv_key: "123123124asdfsadfsa8d7fsadfasdf",
    nostr_pub_key: "123124123123dfsadfsa8d7f11sadfasdf",
    walletsKeys: [
        {
            key: "1645h234j2421zxvertw",
            name: "My Alby wallet key",
            is_current: true
        },
        {
            key: "66345134234235",
            name: "My Phoenix wallet key",
            is_current: false
        },],
    roles: randomItems(3, ...allMakersRoles).map(role => ({ ...role, level: randomItem(...Object.values(RoleLevelEnum)) })),
    skills: randomItems(7, ...allMakersSkills),
    tournaments: [
        {
            id: 1,
            title: "BreezConf",
            description: chance.paragraph(),
            cover_image: getCoverImage(),
            thumbnail_image: getCoverImage(),
            start_date: new Date(2021, 3).toISOString(),
            end_date: new Date(2021, 4).toISOString(),
            tags: [],
            website: "https://breez-conf.com"
        },
        {
            id: 2,
            title: "Shock the Web 3",
            description: chance.paragraph(),
            cover_image: getCoverImage(),
            thumbnail_image: getCoverImage(),
            start_date: new Date(2022, 7).toISOString(),
            end_date: new Date(2022, 11).toISOString(),
            tags: [],
            website: "https://shock-the-web.com"
        },
    ],
    similar_makers: [
        {
            id: 144,
            name: "Johns Beharry",
            jobTitle: "Manager",
            avatar: getAvatarImage(),
        },
        {
            id: 155,
            name: "Edward P",
            jobTitle: "Front-end Developer",
            avatar: getAvatarImage(),
        },
        {
            id: 166,
            name: "Mohammed T",
            jobTitle: "Front-end Developer",
            avatar: getAvatarImage(),
        },
    ] as User[]
}


