import { Tournament, TournamentEventTypeEnum } from "src/graphql";
import { getCoverImage } from "src/mocks/data/utils";


export const events: Tournament['events'] = [
    {
        id: 12,
        title: "STW3 Round Table #1",
        date: "13:00 - 14:00 UTC, 23rd June",
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
        date: "15:00 - 16:00 UTC, 23rd June",
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
        date: "13:00 - 14:00 UTC, 24rd June",
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
        date: "15:00 - 16:00 UTC, 24rd June",
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
        date: "15:00 - 16:00 UTC, 23rd June",
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
        date: "15:00 - 16:00 UTC, 23rd June",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name"
    },
]