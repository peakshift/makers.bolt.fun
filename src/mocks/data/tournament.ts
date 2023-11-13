import { Tournament, TournamentEventTypeEnum } from "src/graphql";
import { getCoverImage } from "./utils";

export const tournaments: Tournament[] = [
  {
    __typename: "Tournament",
    id: 12,
    title: "The Long Night",
    slug: "the-long-night",
    start_date: "2022-09-30T21:00:00.000Z",
    end_date: "2022-10-30T22:00:00.000Z",
    cover_image:
      "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/1d5d2c86-fe46-4478-6909-bb3c425c0d00/public",
    thumbnail_image:
      "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/37fb9cd6-e4f1-43f9-c3fe-7c3e119d5600/public",
    location: "Online",
    website: "#",
    description: `Lorem ipsum dolor sit **amet**, consectetur adipiscing elit. Semper turpis est, ac eget nullam. In leo at pharetra morbi ornare eget. Ultrices posuere senectus purus nulla vitae volutpat id id suspendisse. Urna mattis nulla diam semper erat. Mattis gravida ultrices aliquam odio. Praesent viverra egestas sed elementum nisl imperdiet a, non. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper turpis est, ac eget nullam. In leo at pharetra morbi ornare eget. Ultrices posuere senectus purus nulla vitae volutpat id id suspendisse. Urna mattis nulla diam semper erat. Mattis gravida ultrices aliquam odio. Praesent viverra egestas sed elementum nisl imperdiet a, non. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper turpis est, ac eget nullam. In leo at pharetra morbi ornare eget. Ultrices posuere senectus purus nulla vitae volutpat id id suspendisse.
    `, // markdown
    prizes: [
      {
        title: "STW3  Champion",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image:
          "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/39217dcf-c900-46be-153f-169e3a1f0400/public",
        positions: [
          {
            position: "1st",
            reward: "$ 10k",
            project: null,
          },
        ],
        additional_prizes: null,
      },
      {
        title: "2nd  place",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image:
          "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/39cdb7c8-5fbf-49ff-32cf-fdabc3aa2d00/public",
        positions: [
          {
            position: "1st",
            reward: "$ 10k",
            project: null,
          },
        ],
        additional_prizes: null,
      },
      {
        title: "3rd  place ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image:
          "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/75958797-73b2-4a62-52df-9f0f98c53900/public",
        positions: [
          {
            position: "1st",
            reward: "$ 10k",
            project: null,
          },
        ],
        additional_prizes: null,
      },
      {
        title: "best  design ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image:
          "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/fa7b7cdd-7c06-4ebe-1a2d-94af9d2dae00/public",
        positions: [
          {
            position: "1st",
            reward: "$ 10k",
            project: null,
          },
        ],
        additional_prizes: null,
      },
    ],
    events_count: 6,
    makers_count: 668,
    projects_count: 21,
    events: [
      {
        id: 12,
        title: "STW3 Round Table #1",
        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.TwitterSpace,
        website: "https://event.name",
      },
      {
        id: 13,
        title: "STW3 Round Table #2",
        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name",
      },
      {
        id: 14,
        title: "STW3 Round Table #3",
        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.IrlMeetup,
        website: "https://event.name",
      },
      {
        id: 44,
        title: "Lightning Login",
        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name",
      },

      {
        id: 46,
        title: "Escrow contracts",
        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name",
      },

      {
        id: 444,
        title: "Lsats - What & Why",
        starts_at: "2022-09-30T21:00:00.000Z",
        ends_at: "2022-10-30T22:00:00.000Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
        image: getCoverImage(),
        links: [],
        location: "Online",
        type: TournamentEventTypeEnum.Workshop,
        website: "https://event.name",
      },
    ],
    judges: [
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
      {
        name: "Ben Arc",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        company: "Company",
        twitter: null,
      },
    ],

    faqs: [
      {
        id: 1,
        question: "What is Shock the Web?",
        answer: `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`,
      },
      {
        id: 2,
        question: "When and where will it take place?",
        answer: `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`,
      },
      {
        id: 3,
        question: "What will we be doing?",
        answer: `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`,
      },
      {
        id: 4,
        question:
          "This is my first time hacking on lightning, will there be help?",
        answer: `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`,
      },
      {
        id: 5,
        question:
          "This is my first time hacking on lightning, will there be help?",
        answer: `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`,
      },
      {
        id: 6,
        question: "How many members can I have on my team?",
        answer: `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`,
      },
      {
        id: 7,
        question: "Who will choose the winners?",
        answer: `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`,
      },
    ],
    tracks: [
      { id: 1, title: "Global Adoption", icon: "🤝" },
      { id: 1, title: "Build for Africa", icon: "🌍" },
    ],
    contacts: [
      {
        type: "discord",
        url: "https://discord.gg/AVgabQzCqJ",
      },
    ],
    partners: [
      {
        title: "Organizers",
        items: [
          {
            image:
              "https://mma.prnewswire.com/media/2068426/fedi_brandmark_dark_Logo.jpg?p=publish",
            url: "https://fedi.xyz/",
            isBigImage: true,
          },
          {
            image:
              "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/06bb6244-6812-4d21-e675-9d7b1db6f400/original",
            url: "https://www.stakwork.com/",
            isBigImage: true,
          },
        ],
      },
      {
        title: "Collaborators",
        items: [
          {
            image:
              "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/f9fea1da-e968-420d-a274-52af966b2800/original",
            url: "https://replit.com/",
            isBigImage: true,
          },
        ],
      },
      {
        title: "Sponsors",
        items: [
          {
            image:
              "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/5bf55e42-8eca-41c1-94b6-5b5d1adf0900/original",
            url: "https://hivemind.vc",
            isBigImage: true,
          },
          {
            image:
              "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/b1b9a5b5-87b7-4e7d-e8d5-c6edac962b00/original",
            url: "https://spiritofsatoshi.ai/",
            isBigImage: true,
          },
          {
            image:
              "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/7b6df226-c883-40a7-d332-6bc3faf4d700/original",
            url: "https://premai.io/",
            isBigImage: true,
          },
          {
            image:
              "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/cbd92d74-423e-44a8-761a-16caeeac0100/original",
            url: "http://zebedee.io",
            isBigImage: true,
          },
          {
            image: "https://i.postimg.cc/YqxHzySj/lightspark.png",
            url: "https://www.lightsparks.com/",
            isBigImage: true,
          },
        ],
      },
    ],
    schedule: [
      {
        date: "Saturday July 1",
        events: [
          {
            title: "Hacking Begins",
            time: "00:00",
            timezone: "UTC",
            url: null,
            type: null,
            location: null,
          },
        ],
      },
      {
        date: "Monday July 3",
        events: [
          {
            title: "Opening Ceremony",
            time: "15:00",
            timezone: "UTC",
            url: "https://www.youtube.com/watch?v=I9RMay6ZKL8",
            type: "Presentation",
            location: "Youtube",
          },
        ],
      },
      {
        date: "Tuesday July 4",
        events: [
          {
            title: "Let's Build Sauron: Running a Lightning Node from a Repl",
            time: "16:00",
            timezone: "UTC",
            url: "https://www.youtube.com/watch?v=q0bSRW3FSkM",
            type: "Workshop",
            location: "Youtube",
          },
          {
            title: "Maker Mixer: Eastern Hemisphere",
            time: "13:00",
            timezone: "UTC",
            url: null,
            type: "Hangout",
            location: "BOLT.FUN",
          },
        ],
      },
      {
        date: "Wednesday July 5",
        events: [
          {
            title: "Coding with WebLN",
            time: "17:00",
            timezone: "UTC",
            url: "https://www.youtube.com/@BOLTFUN/featured",
            type: "Workshop",
            location: "Youtube",
          },
          {
            title: "Maker Mixer: Western Hemisphere",
            time: "19:00",
            timezone: "UTC",
            url: null,
            type: "Hangout",
            location: "BOLT.FUN",
          },
        ],
      },
      {
        date: "Thursday July 6",
        events: [
          {
            title: "LNGPT: Build a Lightning Powered AI Chatbot",
            time: "3:00",
            timezone: "PST",
            url: "https://twitch.tv/mckaywrigley",
            type: "Workshop",
            location: "Twitch",
          },
        ],
      },
      {
        date: "Friday July 7",
        events: [
          {
            title: "Check in",
            time: null,
            timezone: null,
            url: null,
            type: "Hangout",
            location: "BOLT.FUN",
          },
        ],
      },
      {
        date: "Monday July 10",
        events: [
          {
            title: "Pay2Chat: Pay Per Message",
            time: "11:00",
            timezone: "UTC",
            url: "https://www.youtube.com/watch?v=i-4Z-itXEiw",
            type: "Workshop",
            location: "Youtube",
          },
          {
            title: "Pay2Chat: Pay Per Message",
            time: "12:00",
            timezone: "UTC",
            url: "https://www.youtube.com/watch?v=w7njz9P2je8",
            type: "Workshop",
            location: "Youtube",
          },
        ],
      },
      {
        date: "Wednesday July 12",
        events: [
          {
            title: "Fedi-mods / Build Fedimint Module",
            time: "12:00",
            timezone: "UTC",
            url: "https://www.youtube.com/@BOLTFUN/featured",
            type: "Workshop",
            location: "Youtube",
          },
          {
            title: "Pay2Chat: Sell Packages Using L402",
            time: "15:00",
            timezone: "UTC",
            url: "https://www.youtube.com/@BOLTFUN/featured",
            type: "Workshop",
            location: "Youtube",
          },
        ],
      },
      {
        date: "Thursday July 13",
        events: [
          {
            title: "Pay2Chat: First Use & Onboarding (UX)",
            time: "11:00",
            timezone: "UTC",
            url: "https://www.youtube.com/@BOLTFUN/featured",
            type: "Workshop",
            location: "Youtube",
          },
          {
            title: "Apature: LangChain + L402 using tools from Lightning Labs",
            time: "16:00",
            timezone: "UTC",
            url: "https://www.youtube.com/@BOLTFUN/featured",
            type: "Workshop",
            location: "Youtube",
          },
        ],
      },
      {
        date: "Friday July 14",
        events: [
          {
            title: "Check in",
            time: "10:00 - 11:30",
            timezone: "UTC",
            url: null,
            type: "Hangout",
            location: "BOLT.FUN",
          },
          {
            title: "Bits and Bolts: AI, Robots and Bitcoin",
            time: "13:00 - 14:00",
            timezone: "UTC",
            url: "https://www.youtube.com/@BOLTFUN/featured",
            type: "Workshop",
            location: "Youtube",
          },
        ],
      },
      {
        date: "Friday July 21",
        events: [
          {
            title: "Check in: Eastern Hemisphere",
            time: "10:00 - 11:30",
            timezone: null,
            url: null,
            type: "Hangout",
            location: "BOLT.FUN",
          },
        ],
      },
      {
        date: "Friday July 28",
        events: [
          {
            title: "Check in",
            time: "10:00 - 11:30",
            timezone: null,
            url: null,
            type: "Hangout",
            location: "BOLT.FUN",
          },
        ],
      },
      {
        date: "Monday July 31",
        events: [
          {
            title: "Hacking Ends",
            time: "00:00",
            timezone: "UTC",
            url: null,
            type: null,
            location: null,
          },
        ],
      },
    ],
    makers_deals: [
      {
        title: "ZEBEDEE Pro Subscription!",
        description:
          "Use code 'ai4all' to get a free subscription though the end of 2023",
        url: "https://dashboard.zebedee.io/signup",
      },
      {
        title: "Voltage 40$ Credit!",
        description: "Use code 'ai4all' to get 40$ in free credits",
        url: "https://account.voltage.cloud/billing/coupon",
      },
    ],
    config: {
      registerationOpen: true,
      projectsSubmissionOpen: true,
      projectsSubmissionClosesOn: null,
      ideasRootNostrEventId: null,
      showFeed: false,
      mainFeedHashtag: null,
      feedFilters: null,
    },
  },
];
