import { Tournament } from '../types/tournaments.types'


export function getTournament(): Tournament {

    return {
        id: 12,
        title: "The Long Night",
        start_date: "2022-09-30T21:00:00.000Z",
        end_date: "2022-10-30T22:00:00.000Z",
        cover_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/1d5d2c86-fe46-4478-6909-bb3c425c0d00/public",
        thumbnail_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/37fb9cd6-e4f1-43f9-c3fe-7c3e119d5600/public",
        location: "Online",
        website: "#",
        description: `
Lorem ipsum dolor sit **amet**, consectetur adipiscing elit. Semper turpis est, ac eget nullam. In leo at pharetra morbi ornare eget. Ultrices posuere senectus purus nulla vitae volutpat id id suspendisse. Urna mattis nulla diam semper erat. Mattis gravida ultrices aliquam odio. Praesent viverra egestas sed elementum nisl imperdiet a, non. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper turpis est, ac eget nullam. In leo at pharetra morbi ornare eget. Ultrices posuere senectus purus nulla vitae volutpat id id suspendisse. Urna mattis nulla diam semper erat. Mattis gravida ultrices aliquam odio. Praesent viverra egestas sed elementum nisl imperdiet a, non. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper turpis est, ac eget nullam. In leo at pharetra morbi ornare eget. Ultrices posuere senectus purus nulla vitae volutpat id id suspendisse.
    `, // markdown
        prizes: [{
            title: "stw3  champion",
            amount: "$ 20k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/39217dcf-c900-46be-153f-169e3a1f0400/public",
        },
        {
            title: "2nd  place",
            amount: "$ 5k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/39cdb7c8-5fbf-49ff-32cf-fdabc3aa2d00/public",
        },
        {
            title: "3rd  place ",
            amount: "$ 2k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/75958797-73b2-4a62-52df-9f0f98c53900/public",
        },
        {
            title: "best  design ",
            amount: "$ 1k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/fa7b7cdd-7c06-4ebe-1a2d-94af9d2dae00/public",
        }],
        events: [],
        faqs: [],
        judges: [],
    }
}