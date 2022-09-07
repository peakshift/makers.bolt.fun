

const tournament = {
    __typename: "Tournament",
    id: 12,
    title: "The Long Night",
    start_date: "2022-09-30T21:00:00.000Z",
    end_date: "2022-10-30T22:00:00.000Z",
    cover_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/1d5d2c86-fe46-4478-6909-bb3c425c0d00/public",
    thumbnail_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/37fb9cd6-e4f1-43f9-c3fe-7c3e119d5600/public",
    location: "Online",
    website: "#",
    description:
        `Lorem ipsum dolor sit **amet**, consectetur adipiscing elit. Semper turpis est, ac eget nullam. In leo at pharetra morbi ornare eget. Ultrices posuere senectus purus nulla vitae volutpat id id suspendisse. Urna mattis nulla diam semper erat. Mattis gravida ultrices aliquam odio. Praesent viverra egestas sed elementum nisl imperdiet a, non. 

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
    events_count: 6,
    makers_count: 668,
    projects_count: 21,
    events: [
        {
            id: 12,
            title: "STW3 Round Table #1",

            starts_at: "2022-09-30T21:00:00.000Z",
            ends_at: "2022-10-30T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Online",
            type: 1,
            website: "https://event.name"
        },
        {
            id: 13,
            title: "STW3 Round Table #2",
            starts_at: "2022-09-30T21:00:00.000Z",
            ends_at: "2022-10-30T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Online",
            type: 2,
            website: "https://event.name"
        },
        {
            id: 14,
            title: "STW3 Round Table #3",
            starts_at: "2022-09-30T21:00:00.000Z",
            ends_at: "2022-10-30T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Online",
            type: 3,
            website: "https://event.name"
        },
        {
            id: 44,
            title: "Lightning Login",
            starts_at: "2022-09-30T21:00:00.000Z",
            ends_at: "2022-10-30T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Online",
            type: 2,
            website: "https://event.name"
        },

        {
            id: 46,
            title: "Escrow contracts",
            starts_at: "2022-09-30T21:00:00.000Z",
            ends_at: "2022-10-30T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Online",
            type: 2,
            website: "https://event.name"
        },

        {
            id: 444,
            title: "Lsats - What & Why",
            starts_at: "2022-09-30T21:00:00.000Z",
            ends_at: "2022-10-30T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Online",
            type: 2,
            website: "https://event.name"
        },
    ],
    judges: [
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
        {
            name: "Ben Arc",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Company",
            twitter: "@arcbtc"
        },
    ],

    faqs: [
        {
            question: "What is Shock the Web?",
            answer:
                `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`
        },
        {
            question: "When and where will it take place?",
            answer:
                `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`
        },
        {
            question: "What will we be doing?",
            answer:
                `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`
        },
        {
            question: "This is my first time hacking on lightning, will there be help?",
            answer:
                `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`
        },
        {
            question: "This is my first time hacking on lightning, will there be help?",
            answer:
                `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`
        },
        {
            question: "How many members can I have on my team?",
            answer:
                `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`
        },
        {
            question: "Who will choose the winners?",
            answer:
                `Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there. 

Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.`
        },
    ],
}

module.exports = { tournament };