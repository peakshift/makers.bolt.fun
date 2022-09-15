import { Tournament, } from "src/graphql";
import { description } from "./description";
import { events } from "./events";
import { faqs } from "./faqs";
import { judges } from "./judeges";
import { prizes } from "./prizes";

export const tournamentData: Tournament = {
    __typename: "Tournament",
    id: 12,
    title: "The Long Night",
    start_date: "2022-09-30T21:00:00.000Z",
    end_date: "2022-10-30T22:00:00.000Z",
    cover_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/1d5d2c86-fe46-4478-6909-bb3c425c0d00/public",
    thumbnail_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/37fb9cd6-e4f1-43f9-c3fe-7c3e119d5600/public",
    location: "Online",
    website: "#",
    description: description,
    prizes: prizes,
    events_count: events.length,
    makers_count: 668,
    projects_count: 21,

    events: events,
    judges: judges,
    faqs: faqs,
}