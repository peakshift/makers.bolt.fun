
const categories = [
    {
        "id": 5,
        "title": "Wallet"
    },
    {
        "id": 2,
        "title": "Social"
    },
    {
        "id": 8,
        "title": "Shopping"
    },
    {
        "id": 11,
        "title": "Shock the Web ⚡️"
    },
    {
        "id": 9,
        "title": "Misc / Other"
    },
    {
        "id": 7,
        "title": "Media & News"
    },
    {
        "id": 4,
        "title": "Gaming"
    },
    {
        "id": 1,
        "title": "Finance"
    },
    {
        "id": 10,
        "title": "Exchange"
    },
    {
        "id": 3,
        "title": "Art & Collectibles"
    },
    {
        "id": 6,
        "title": "Analytics"
    }
]


const projects = [
    {
        "id": 22,
        "title": "Geyser Fund",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/geyser-fund_cover.png",
        "thumbnail_image": "https://user-images.githubusercontent.com/36778205/157433567-4b1e41db-23d4-4a80-b48f-ee248ee87f1e.jpg",
        "website": "https://geyser.fund/",
        "lightning_address": "divineorgan67@walletofsatoshi.com",
        "votes_count": 232,
        "category": {
            "id": 1
        }
    },
    {
        "id": 16,
        "title": "Alby",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/alby_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/alby_thumbnail.png",
        "website": "https://getalby.com/",
        "lightning_address": "hello@getalby.com",
        "votes_count": 215,
        "category": {
            "id": 9
        }
    },
    {
        "id": 20,
        "title": "Lightning.Video",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-video_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-video_thumbnail.png",
        "website": "https://lightning.video/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 175,
        "category": {
            "id": 7
        }
    },
    {
        "id": 1,
        "title": "Kollider",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/kollider_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/kollider_thumbnail.png",
        "website": "https://kollider.xyz/",
        "lightning_address": "johns@getalby.com",
        "votes_count": 120,
        "category": {
            "id": 1
        }
    },
    {
        "id": 12,
        "title": "Bitrefill",
        "cover_image": "http://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/bitrefill_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/bitrefill_thumbnail.png",
        "website": "https://www.bitrefill.com/buy",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 25,
        "category": {
            "id": 8
        }
    },
    {
        "id": 7,
        "title": "Wavlake",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/wavlake_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/wavlake_thumbnail.png",
        "website": "https://www.wavlake.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 25,
        "category": {
            "id": 7
        }
    },
    {
        "id": 3,
        "title": "Sparkshot",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sparkshot_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sparkshot_thumbnail.png",
        "website": "https://sparkshot.io/",
        "lightning_address": "johns@getalby.com",
        "votes_count": 11,
        "category": {
            "id": 3
        }
    },
    {
        "id": 17,
        "title": "Lightning Gifts",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-gifts_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-gifts_thumbnail.png",
        "website": "https://lightning.gifts/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 10,
        "category": {
            "id": 8
        }
    },
    {
        "id": 4,
        "title": "Amboss Space",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/amboss-space_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/amboss-space_thumbnail.png",
        "website": "https://amboss.space/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 6
        }
    },
    {
        "id": 5,
        "title": "LN Blackjack",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnblackjack_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnblackjack_thumbnail.png",
        "website": "https://www.lnblackjack.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4
        }
    },
    {
        "id": 19,
        "title": "Y'alls ",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/yalls_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/yalls_thumbnail.png",
        "website": "https://yalls.org/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 2
        }
    },
    {
        "id": 13,
        "title": "Lightning Network Stores",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-network-stores_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-network-stores_thumbnail.png",
        "website": "https://lightningnetworkstores.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 8
        }
    },
    {
        "id": 9,
        "title": "Lightning Poker",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-poker_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-poker_thumbnail.png",
        "website": "https://lightning-poker.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4
        }
    },
    {
        "id": 6,
        "title": "LNGames",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lngames_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lngames_thumbnail.png",
        "website": "https://lngames.net/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4
        }
    },
    {
        "id": 21,
        "title": "Starbackr",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/starbackr_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/starbackr_thumbail.png",
        "website": "https://www.starbackr.com/",
        "lightning_address": "moritz@geralby.com",
        "votes_count": 0,
        "category": {
            "id": 7
        }
    },
    {
        "id": 8,
        "title": "LOFT",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/loft-trade_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/loft-trade_thumbnail.png",
        "website": "https://loft.trade/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 1
        }
    },
    {
        "id": 10,
        "title": "Lightning Roulette",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-roulette_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lightning-roulette_thumbnail.png",
        "website": "https://lightning-roulette.com/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 4
        }
    },
    {
        "id": 14,
        "title": "Sats 4 Likes",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sats-4-likes-cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/sats-4-likes_thumbnail.png",
        "website": "https://kriptode.com/satsforlikes/index.html",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 9
        }
    },
    {
        "id": 18,
        "title": "Scarce City",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/scarce-city_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/scarce-city_thumbnail.png",
        "website": "https://scarce.city/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 3
        }
    },
    {
        "id": 15,
        "title": "lnshort.it",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnshort-it_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnshort-it_thumbnail.png",
        "website": "https://lnshort.it/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 9
        }
    },
    {
        "id": 11,
        "title": "Stacker News",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/stacker-news_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/stacker-news_thumbnail.png",
        "website": "https://stacker.news/",
        "lightning_address": "moritz@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 7
        }
    },
    {
        "id": 2,
        "title": "LN Markets",
        "cover_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnmarkets_cover.png",
        "thumbnail_image": "https://fra1.digitaloceanspaces.com/alby-storage/makers-bolt-fun/bolt.fund_thumbnails_covers/lnmarkets_thumbnail.png",
        "website": "https://lnmarkets.com/",
        "lightning_address": "johns@getalby.com",
        "votes_count": 0,
        "category": {
            "id": 1
        }
    }
]


module.exports = {
    categories,
    projects
}