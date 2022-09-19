import { Tournament, TournamentEventTypeEnum } from "src/graphql";
import { getCoverImage } from "src/mocks/data/utils";


export const events: Tournament['events'] = [
    {
        id: 12,
        title: "STW3 Round Table #1",

        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.TwitterSpace,
        website: "https://event.name"
    },
    {
        id: 13,
        title: "STW3 Round Table #2",

        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name"
    },
    {
        id: 14,
        title: "STW3 Round Table #3",

        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.IrlMeetup,
        website: "https://event.name"
    },
    {
        id: 44,
        title: "Lightning Login",

        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name"
    },

    {
        id: 46,
        title: "Escrow contracts",

        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name"
    },

    {
        id: 444,
        title: "Lsats - What & Why",

        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.OnlineMeetup,
        website: "https://event.name"
    },
]