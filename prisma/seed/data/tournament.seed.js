

const tournament = {
    __typename: "Tournament",
    id: 12,
    title: "Legends of Lightning ⚡️",
    start_date: "2022-10-12T21:00:00.000Z",
    end_date: "2022-11-30T22:00:00.000Z",
    cover_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/1d5d2c86-fe46-4478-6909-bb3c425c0d00/public",
    thumbnail_image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/37fb9cd6-e4f1-43f9-c3fe-7c3e119d5600/public",
    location: "Online",
    website: "#",
    description: // this field accepts markdown
        `## Tournament Details
BOLT🔩FUN’s maiden tournament, **Legends of Lightning** ⚡ will be an online global competition for makers to learn, connect, collaborate, and experiment with building innovative applications and tools with bitcoin and lightning. 

Spanning a 2-month period, makers can form teams, hack on projects, and show off their progress, activity, and updates as they compete for up to **$10,000 in bitcoin prizes**.

BOLT🔩FUN has partnered with a number of events, meetups, and hackathons to provide makers the opportunity to brainstorm, design, build, and accelerate their tournament projects over the course of a couple of months. At the end of the tournament, a panel of judges will access and score all submitted projects - announcing the winners in the second week of December!

 `, // markdown
    prizes: [
        {
            title: "stw3  champion",
            amount: "$ 5k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/39217dcf-c900-46be-153f-169e3a1f0400/public",
        },
        {
            title: "2nd  place",
            amount: "$ 2.5k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/39cdb7c8-5fbf-49ff-32cf-fdabc3aa2d00/public",
        },
        {
            title: "3rd  place ",
            amount: "$ 1.5k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/75958797-73b2-4a62-52df-9f0f98c53900/public",
        },
        {
            title: "best  design ",
            amount: "$ 1k",
            image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/fa7b7cdd-7c06-4ebe-1a2d-94af9d2dae00/public",
        }
    ],

    events: [
        {
            title: "Tab Conf 22",
            starts_at: "2022-10-13T21:00:00.000Z",
            ends_at: "2022-10-15T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Atlanta, GA",
            type: 1, /** EVent typs encoding
             * 
                Twitter Space: 0,
                Workshop: 1,
                IRL Meetup: 2,
                Online Meetup: 3,
             */
            website: "https://2022.tabconf.com/"
        },
        {
            title: "Bitcoin Amsterdam",
            starts_at: "2022-10-12T21:00:00.000Z",
            ends_at: "2022-10-14T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Amsterdam, NL",
            type: 2,
            website: "https://b.tc/conference/amsterdam"
        },
        {
            title: "Lugano’s Plan ₿",
            starts_at: "2022-10-28T21:00:00.000Z",
            ends_at: "2022-11-04T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Lugano, CH",
            type: 3,
            website: "https://planb.lugano.ch/"
        },
        {
            title: "Adopting Bitcoin 22",
            starts_at: "2022-11-15T21:00:00.000Z",
            ends_at: "2022-11-17T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "El Salvador",
            type: 2,
            website: "https://adoptingbitcoin.org/2022/"
        },

        {
            title: "PlebTLV",
            starts_at: "2022-10-23T21:00:00.000Z",
            ends_at: "2022-10-23T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Tel Aviv",
            type: 2,
            website: "https://plebtlv.com/"
        },
        {
            title: "Bitcoin Designathon",
            starts_at: "2022-10-12T21:00:00.000Z",
            ends_at: "2022-10-16T22:00:00.000Z",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam morbi pellentesque velit congue. Aliquet rutrum a, augue vitae tincidunt ac egestas. Mauris nec fringilla diam eget fusce malesuada cum parturient. Nulla pretium purus odio odio.",
            image: 'https://picsum.photos/id/10/400/800',
            links: [],
            location: "Online",
            type: 2,
            website: "https://bitcoin.design"
        },
    ],
    judges: [
        {
            name: "Roy Sheinfeld",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Breez",
            twitter: "@therealkingonly"
        },
        {
            name: "John Carvalho",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Synonym",
            twitter: "@BitcoinErrorLog"
        },
        {
            name: "Nifty Nei",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Blockstream",
            twitter: "@niftynei"
        },
        {
            name: "Oleg Mikhalsky",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Fulgur Ventures",
            twitter: "@olegmikh1"
        },
        {
            name: "Alyse Kileen",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Stillmark VC",
            twitter: "@AlyseKilleen"
        },
        {
            name: "Johns Beharry",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "Peak Shift",
            twitter: "@johnsBeharry"
        },
        {
            name: "Ben Price",
            avatar: "https://s3-alpha-sig.figma.com/img/5e65/c22c/673b8f74ac43f024b036dbc4e6479e0d?Expires=1662940800&Signature=GR54s7FBcLGcPTVclWdmPjzU92tyrYpdUbbDUYKMUkdQbxq2yQlUhZ-AOLDHhOPY4P2G3aW2yT16b1AUbC8RBx1boH25MSrH-jpn6X57IJA-4ZeHP8zCo-yjTLpb8Gn~vudIi9rPfbwJ34stp-VeOAYMuOHlah3YO-B4MBsBv-NqhP7BMY4zz9vGdBLZhOjYQYdLZ2494Ae6L5FpD1ah3WD3U5qUN9dDvYvAtqYfhQeBOnsG6PfYoq8LouCuERC4S26BeooPg8UdGUCf324-SjEihCoL8mQFq80PSsaAZl5~EBOKRUx14FOprizMusaYN0K06E~fjDIDbM2Rmc9Xjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            company: "The Bitcoin Company",
            twitter: "@abitcoinperson"
        },
    ],

    faqs: [
        {
            question: "When does the tournament start and end?",
            answer:
                `The tournament starts when team and project registrations open on 12th October. The tournament will finish with submissions closing on 30th November, 2022. Judges will then score projects and announce the winners on the 12th December.`
        },
        {
            question: "When and how do we register our projects?",
            answer:
                `Makers can register their projects anytime between 12th October - 30th November. If a project is added on the tournament page, it is automatically registered and it will be judged at the end of the tournament.`
        },
        {
            question: "How will projects be judged?",
            answer:
                `Projects will be judged and scored on the following criteria:  

**1). 🎯 Value Proposition**  
Does the project have a product market fit? Does it provide value to the bitcoin ecosystem and beyond?  

**2). 🚨 Innovation**  
Is it something we've seen before or does it bring something new and exciting to bitcoin and beyond?  

**3). 👁️ Transparency (#BuildInPublic)**  
Encouraging makers to #BuildInPublic. Has the project’s team been transparent throughout their product design and development journey?  

**4). ✅ Execution**  
Makers should focus on attention to detail. How well has the project been executed?   

**5). 🍒 UIUX Design**  
Design can separate the good from the bad. Taking into account both UI and UX, how well has the application or feature been designed?  
 
**6). 🔥 Je ne sais quoi**  
Does the project have that extra level of pizazz or coolness? Does it raise the bar?`
        },
        {
            question: "Can I submit a project that I hacked on during another event?",
            answer:
                `Makers can submit their projects from other hackathons, events, and meetups that are registered as events within The Long Night tournament. This allows makers to take advantage of IRL + online meetups, workshops, hackerspaces, inspirational weekend events, and more.`
        },
        {
            question: "Can I submit multiple projects?",
            answer:
                `Yes, makers can submit multiple projects. However we encourage makers to focus on quality rather than quantity.`
        },
        {
            question: "How can I find other makers or projects to team up with?",
            answer:
                `You can see a list of makers who are open to connect in the tournament’s Makers tab. You can also search for projects that are looking to recruit members.`
        },
        {
            question: "This is my first time hacking on bitcoin, is there any help?",
            answer:
                `We collected some awesome design, development, and project management resources here to get you up and running. You can also watch workshops and tutorials from BOLT🔩FUN’s previous ShockTheWeb⚡hackathons here.`
        },
        {
            question: "Not sure what to hack on?",
            answer:
                `Not sure where to get started? Need an idea to hack on? Not to worry, we’ve collected a list of great project ideas for you to look at here.`
        },
        {
            question: "How can I #BuildInPublic?",
            answer:
                `Using BOLT🔩FUN Stories ✍️, makers can transparently document their project’s design, development, and management processes. This will help other makers learn from one another, decreasing essential onboarding and learning time, whilst inspiring more great bitcoin apps to be built and innovated on. To see an example of this type of transparent reporting, check out this story here.`
        },
    ],
}

module.exports = { tournament };