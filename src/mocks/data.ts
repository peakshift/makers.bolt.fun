import ASSETS from "src/assets";
import { Project, ProjectCategory } from "src/utils/interfaces";

let categories = [
    {
        "id": 10,
        "title": "Video",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '📹',
        votes_sum: 1200,
    },
    {
        "id": 8,
        "title": "Shopping",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '🛒',
        votes_sum: 850,
    },
    {
        "id": 5,
        "title": "Music",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '🎭',
        votes_sum: 820,
    },
    {
        "id": 9,
        "title": "Miscellaneous",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '🎁',
        votes_sum: 675,
    },
    {
        "id": 4,
        "title": "Gaming",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '🎮',
        votes_sum: 675,
    },
    {
        "id": 1,
        "title": "Finance",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '💵',
        votes_sum: 250,
    },
    {
        "id": 2,
        "title": "Digital Print",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '🚨',
        votes_sum: 200,
    },
    {
        "id": 7,
        "title": "Digital Content",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '💱',
        votes_sum: 180,
    },
    {
        "id": 3,
        "title": "Art & Collectibles",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '🎨',
        votes_sum: 120,
    },
    {
        "id": 6,
        "title": "Analytics",
        cover_image: ASSETS.Images_ExploreHeader1,
        icon: '💸',
        votes_sum: 100,
    },

]

let projects = [
    {
        "id": 1,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/kollider_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/kollider_thumbnail.png",
        "title": "Kollider",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://kollider.xyz/",
        "lightning_address": "johns@getalby.com",
        "votes_count": 120,
        "category": {
            "id": 1,
            "title": "Finance"
        }
    },
    {
        "id": 16,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/alby_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/alby_thumbnail.png",
        "title": "Alby",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://getalby.com/",
        "lightning_address": "hello@getalby.com",
        "votes_count": 100,
        "category": {
            "id": 9,
            "title": "Miscellaneous"
        }
    },
    {
        "id": 12,
        "cover_image": "http://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/bitrefill_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/bitrefill_thumbnail.png",
        "title": "Bitrefill",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://www.bitrefill.com/buy",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 25,
        "category": {
            "id": 8,
            "title": "Shopping"
        }
    },
    {
        "id": 20,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-video_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-video_thumbnail.png",
        "title": "Lightning.Video",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lightning.video/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 15,
        "category": {
            "id": 7,
            "title": "Digital Content"
        }
    },
    {
        "id": 3,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sparkshot_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sparkshot_thumbnail.png",
        "title": "Sparkshot",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://sparkshot.io/",
        "lightning_address": "johns@getalby.com",
        "votes_count": 11,
        "category": {
            "id": 3,
            "title": "Art"
        }
    },
    {
        "id": 17,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-gifts_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-gifts_thumbnail.png",
        "title": "Lightning Gifts",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lightning.gifts/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 10,
        "category": {
            "id": 8,
            "title": "Shopping"
        }
    },
    {
        "id": 18,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/scarce-city_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/scarce-city_thumbnail.png",
        "title": "Scarce City",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://scarce.city/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 3,
            "title": "Art"
        }
    },
    {
        "id": 15,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnshort-it_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnshort-it_thumbnail.png",
        "title": "lnshort.it",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lnshort.it/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 9,
            "title": "Miscellaneous"
        }
    },
    {
        "id": 11,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/stacker-news_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/stacker-news_thumbnail.png",
        "title": "Stacker News",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://stacker.news/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 7,
            "title": "Digital Content"
        }
    },
    {
        "id": 21,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/starbackr_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/starbackr_thumbail.png",
        "title": "Starbackr",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://www.starbackr.com/",
        "lightning_address": "moritz@geralby.com",
        "votes_count": 0,
        "category": {
            "id": 7,
            "title": "Digital Content"
        }
    },
    {
        "id": 2,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnmarkets_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnmarkets_thumbnail.png",
        "title": "LN Markets",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lnmarkets.com/",
        "lightning_address": "johns@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 1,
            "title": "Finance"
        }
    },
    {
        "id": 5,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnblackjack_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnblackjack_thumbnail.png",
        "title": "LN Blackjack",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://www.lnblackjack.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4,
            "title": "Gaming"
        }
    },
    {
        "id": 19,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/yalls_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/yalls_thumbnail.png",
        "title": "Y'alls ",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://yalls.org/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 2,
            "title": "Digital Print"
        }
    },
    {
        "id": 13,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-network-stores_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-network-stores_thumbnail.png",
        "title": "Lightning Network Stores",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lightningnetworkstores.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 8,
            "title": "Shopping"
        }
    },
    {
        "id": 9,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-poker_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-poker_thumbnail.png",
        "title": "Lightning Poker",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lightning-poker.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4,
            "title": "Gaming"
        }
    },
    {
        "id": 6,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lngames_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lngames_thumbnail.png",
        "title": "LNGames",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lngames.net/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4,
            "title": "Gaming"
        }
    },
    {
        "id": 4,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/amboss-space_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/amboss-space_thumbnail.png",
        "title": "Amboss Space",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://amboss.space/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 6,
            "title": "Analytics"
        }
    },
    {
        "id": 8,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/loft-trade_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/loft-trade_thumbnail.png",
        "title": "LOFT",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://loft.trade/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 1,
            "title": "Finance"
        }
    },
    {
        "id": 10,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-roulette_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-roulette_thumbnail.png",
        "title": "Lightning Roulette",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://lightning-roulette.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4,
            "title": "Gaming"
        }
    },
    {
        "id": 14,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sats-4-likes-cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sats-4-likes_thumbnail.png",
        "title": "Sats 4 Likes",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://kriptode.com/satsforlikes/index.html",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 9,
            "title": "Miscellaneous"
        }
    },
    {
        "id": 7,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/wavlake_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/wavlake_thumbnail.png",
        "title": "Wavlake",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://www.wavlake.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 7,
            "title": "Digital Content"
        }
    },
    {
        "id": 22,
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/geyser-fund_cover.png",
        "thumbnail_image": "https://user-images.githubusercontent.com/36778205/157433567-4b1e41db-23d4-4a80-b48f-ee248ee87f1e.jpg",
        "title": "Geyser Fund",
        "description": "Project description",
        screenShots: [],
        tags: [],
        "website": "https://geyser.fund/",
        "lightning_address": "0272e8731c6feda7fb7e2b8dbe0fbf1322f9e3b60cc2727f4ee4ca0f820b9cd169@35.206.90.207:9735",
        "votes_count": 0,
        "category": {
            "id": 9,
            "title": "Miscellaneous"
        }
    }
]

// Process Data
// ------------


// 1- Add Typenames
categories = categories.map(c => ({ ...c, __typename: "Category" }))
projects = projects.map(p => ({ ...p, __typename: "Project" }))

// 2- Computed Fields
categories = categories.map(c => ({ ...c, apps_count: projects.reduce((acc, p) => acc + (p.category.id === c.id ? 1 : 0), 0) }))

export const MOCK_DATA = {
    projects: projects as Project[],
    categories: categories as ProjectCategory[]
}