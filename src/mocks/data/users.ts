import { Chance } from "chance";
import { MyProfile, RoleLevelEnum, User } from "src/graphql";
import { posts } from "./posts";
import { getCoverImage, getAvatarImage } from "./utils";

const chance = new Chance();

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
            name: "My Alby wallet key"
        },
        {
            key: "66345134234235",
            name: "My Phoenix wallet key"
        },],
    roles: [
        {
            id: 12,
            title: "Developer",
            icon: "💻️",
            level: RoleLevelEnum.Pro,
        },
        {
            id: 14,
            title: "Founder",
            icon: "🦄️",
            level: RoleLevelEnum.Intermediate,
        },
        {
            id: 51,
            title: "Community Manager",
            icon: "🎉️",
            level: RoleLevelEnum.Hobbyist,
        },
    ],
    skills: [
        {
            id: 1,
            title: chance.word(),
        },
        {
            id: 2,
            title: chance.word(),
        },
        {
            id: 3,
            title: chance.word(),
        },
        {
            id: 4,
            title: chance.word(),
        },
        {
            id: 5,
            title: chance.word(),
        },
        {
            id: 6,
            title: chance.word(),
        },
        {
            id: 7,
            title: chance.word(),
        },
    ],
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
