import { Chance } from "chance";
import {
  GenericMakerRole,
  MakerSkill,
  RoleLevelEnum,
  Tournament,
  User,
} from "src/graphql";
import { randomItem, randomItems } from "src/utils/helperFunctions";
import { posts } from "./posts";
import { projects } from "./projects";
import { getCoverImage, getAvatarImage } from "./utils";

const chance = new Chance();
export const allMakersRoles: GenericMakerRole[] = [
  {
    id: 1,
    title: "Frontend Dev",
    icon: "💄",
  },
  {
    id: 2,
    title: "Backend Dev",
    icon: "💻️",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    icon: "🌈️️",
  },
  {
    id: 4,
    title: "Community Manager",
    icon: "🎉️️",
  },
  {
    id: 5,
    title: "Founder",
    icon: "🦄️",
  },
  {
    id: 6,
    title: "Marketer",
    icon: "🚨️",
  },
  {
    id: 7,
    title: "Content Creator",
    icon: "🎥️",
  },
  {
    id: 8,
    title: "Researcher",
    icon: "🔬",
  },
  {
    id: 9,
    title: "Data engineer",
    icon: "💿️",
  },
  {
    id: 10,
    title: "Growth hacker",
    icon: "📉️",
  },
  {
    id: 11,
    title: "Technical Writer",
    icon: "✍️️",
  },
];

export const allMakersSkills: MakerSkill[] = [
  {
    id: 1,
    title: "Figma",
  },
  {
    id: 2,
    title: "Prototyping",
  },
  {
    id: 3,
    title: "Writing",
  },
  {
    id: 4,
    title: "CSS",
  },
  {
    id: 5,
    title: "React.js",
  },
  {
    id: 6,
    title: "Wordpress",
  },
  {
    id: 7,
    title: "Principle app",
  },
  {
    id: 8,
    title: "UX design",
  },
  {
    id: 9,
    title: "User research",
  },
  {
    id: 10,
    title: "User testing",
  },
];

const similar_makers = [
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
    id: 123,
    name: "Mohammed T",
    jobTitle: "Front-end Developer",
    avatar: getAvatarImage(),
  },
] as User[];

const tournaments = [
  {
    id: 1,
    title: "BreezConf",
    description: chance.paragraph(),
    cover_image: getCoverImage(),
    thumbnail_image: getCoverImage(),
    start_date: new Date(2021, 3).toISOString(),
    end_date: new Date(2021, 4).toISOString(),
    website: "https://breez-conf.com",
  },
  {
    id: 2,
    title: "Shock the Web 3",
    description: chance.paragraph(),
    cover_image: getCoverImage(),
    thumbnail_image: getCoverImage(),
    start_date: new Date(2022, 7).toISOString(),
    end_date: new Date(2022, 11).toISOString(),
    website: "https://shock-the-web.com",
  },
] as Tournament[];

export const users: User[] = [
  {
    id: 123,
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
    discord: "mtg#1234",
    website: "https://mtg-dev.tech",
    stories: posts.stories,
    in_tournament: true,
    roles: randomItems(3, ...allMakersRoles).map((role) => ({
      ...role,
      level: randomItem(...Object.values(RoleLevelEnum)),
    })),
    skills: randomItems(7, ...allMakersSkills),
    tournaments,
    similar_makers,
    projects: projects.slice(0, 3),
    nostr_keys: [
      {
        key: "123123123123",
        createdAt: new Date().toISOString(),
        label: "My nostr key",
      },
    ],
    private_data: {
      id: 1,
      email: "myemail@gmail.com",
      nostr_prv_key: "123123124asdfsadfsa8d7fsadfasdf",
      nostr_pub_key: "123124123123dfsadfsa8d7f11sadfasdf",
      walletsKeys: [
        {
          key: "1645h234j2421zxvertw",
          name: "My Alby wallet key",
          is_current: true,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
        {
          key: "66345134234235",
          name: "My Phoenix wallet key",
          is_current: false,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
      ],
    },
  },
  {
    id: 441,
    avatar: "https://avatars.dicebear.com/api/bottts/Eduardu.svg",
    bio: "Lorem asiop asklh kluiw wekjhl shkj kljhsva klu khsc klhlkbs mjklwqr kmlk sadlfui mewr qiumnk, asdjomi cskhsdf.",
    name: "Edward P",
    github: "barefoot_88",
    jobTitle: "Senior Product Designer",
    join_date: new Date(2021).toISOString(),
    lightning_address: "ed@getalby.com",
    linkedin: "https://www.linkedin.com/in/mtg-softwares-dev/",
    location: "Germany, Berlin",
    role: "user",
    twitter: "john-doe",
    discord: "john#1234",
    website: "https://mtg-dev.tech",
    stories: posts.stories,
    in_tournament: true,
    roles: randomItems(3, ...allMakersRoles).map((role) => ({
      ...role,
      level: randomItem(...Object.values(RoleLevelEnum)),
    })),
    skills: randomItems(7, ...allMakersSkills),
    tournaments,
    similar_makers,
    projects: projects.slice(0, 3),
    nostr_keys: [
      {
        key: "123123123123",
        createdAt: new Date().toISOString(),
        label: "My nostr key",
      },
    ],

    private_data: {
      id: 1,
      email: "myemail@gmail.com",
      nostr_prv_key: "123123124asdfsadfsa8d7fsadfasdf",
      nostr_pub_key: "123124123123dfsadfsa8d7f11sadfasdf",
      walletsKeys: [
        {
          key: "1645h234j2421zxvertw",
          name: "My Alby wallet key",
          is_current: true,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
        {
          key: "66345134234235",
          name: "My Phoenix wallet key",
          is_current: false,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
      ],
    },
  },
  {
    id: 422,
    avatar: "https://avatars.dicebear.com/api/bottts/Johns.svg",
    bio: "Lorem asiop asklh kluiw wekjhl shkj kljhsva klu khsc klhlkbs mjklwqr kmlk sadlfui mewr qiumnk, asdjomi cskhsdf.",
    name: "Johns Beharry",
    github: "johnsbehhary",
    jobTitle: "Manager",
    join_date: new Date(2021).toISOString(),
    lightning_address: "johns@getalby.com",
    linkedin: "https://www.linkedin.com/in/mtg-softwares-dev/",
    location: "Germany, Berlin",
    role: "user",
    twitter: "john-doe",
    discord: "john#1234",
    website: "https://mtg-dev.tech",
    stories: posts.stories,
    in_tournament: true,
    roles: randomItems(3, ...allMakersRoles).map((role) => ({
      ...role,
      level: randomItem(...Object.values(RoleLevelEnum)),
    })),
    skills: randomItems(7, ...allMakersSkills),
    tournaments,
    similar_makers,
    projects: projects.slice(0, 3),
    nostr_keys: [
      {
        key: "123123123123",
        createdAt: new Date().toISOString(),
        label: "My nostr key",
      },
    ],

    private_data: {
      id: 1,
      email: "myemail@gmail.com",
      nostr_prv_key: "123123124asdfsadfsa8d7fsadfasdf",
      nostr_pub_key: "123124123123dfsadfsa8d7f11sadfasdf",
      walletsKeys: [
        {
          key: "1645h234j2421zxvertw",
          name: "My Alby wallet key",
          is_current: true,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
        {
          key: "66345134234235",
          name: "My Phoenix wallet key",
          is_current: false,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
      ],
    },
  },
  {
    id: 511,
    avatar: "https://avatars.dicebear.com/api/bottts/Carlos.svg",
    bio: "Lorem asiop asklh kluiw wekjhl shkj kljhsva klu khsc klhlkbs mjklwqr kmlk sadlfui mewr qiumnk, asdjomi cskhsdf.",
    name: "Mohammed Taher ",
    github: "MTG2000",
    jobTitle: "Back-end Web Developer",
    join_date: new Date(2021).toISOString(),
    lightning_address: "carlos@getalby.com",
    linkedin: "https://www.linkedin.com/in/mtg-softwares-dev/",
    location: "Germany, Berlin",
    role: "user",
    twitter: "john-doe",
    discord: "john#1234",
    website: "https://mtg-dev.tech",
    stories: posts.stories,
    in_tournament: true,
    roles: randomItems(3, ...allMakersRoles).map((role) => ({
      ...role,
      level: randomItem(...Object.values(RoleLevelEnum)),
    })),
    skills: randomItems(7, ...allMakersSkills),
    tournaments,
    similar_makers,
    projects: projects.slice(0, 3),
    nostr_keys: [
      {
        key: "123123123123",
        createdAt: new Date().toISOString(),
        label: "My nostr key",
      },
    ],
    private_data: {
      id: 1,
      email: "myemail@gmail.com",
      nostr_prv_key: "123123124asdfsadfsa8d7fsadfasdf",
      nostr_pub_key: "123124123123dfsadfsa8d7f11sadfasdf",
      walletsKeys: [
        {
          key: "1645h234j2421zxvertw",
          name: "My Alby wallet key",
          is_current: true,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
        {
          key: "66345134234235",
          name: "My Phoenix wallet key",
          is_current: false,
          createdAt: new Date(2022, 6, 2).toISOString(),
        },
      ],
    },
  },
];
