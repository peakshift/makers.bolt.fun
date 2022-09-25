import { toSlug } from "../helperFunctions";

type RouteOptions =
    | {
        type: "post",
        id: string | number,
        postType: string,
        title?: string,
        username?: string,
    }
    | {
        type: "story",
        id: string | number,
        title?: string,
        username?: string,
    }
    | {
        type: "write-story",
        id?: number,
    }
    | {
        type: "bounty",
        id: string | number,
        title?: string,
        username?: string,
    }
    | {
        type: "question",
        id: string | number,
        title?: string,
        username?: string,
    }
    | {
        type: "profile",
        id: string | number,
        username?: string,
    }
    | {
        type: "edit-profile",
    }
    | {
        type: "tournament",
        id: string | number
        tab?: 'overview' | 'events' | 'makers' | 'projects'
    }

export function createRoute(options: RouteOptions) {

    if ((options.type === "post" && options.postType.toLowerCase() === 'story')
        || options.type === "story") {
        const onlyId = !options.title;
        return "/story/"
            // + (options.username ? `${toSlug(options.username)}-` : "")
            + (options.title ? `${toSlug(options.title)}-` : "")
            + (!onlyId ? "-" : "")
            + `${options.id}`
    }

    if (options.type === 'write-story')
        return "/story/write?type=story"

    if ((options.type === "post" && options.postType.toLowerCase() === 'bounty')
        || options.type === "bounty")
        return `/blog/post/bounty/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");


    if ((options.type === "post" && options.postType.toLowerCase() === 'question')
        || options.type === "question")
        return `/blog/post/question/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");


    if (options.type === "profile")
        return `/profile/${options.id}`
            + (options.username ? `/${toSlug(options.username)}` : "");

    if (options.type === 'edit-profile')
        return '/edit-profile'


    if (options.type === 'tournament')
        return `/tournaments/${options.id}` + (options.tab ? `/${options.tab}` : "")

    return ""
}

export const PAGES_ROUTES = {
    projects: {
        default: "/projects",
        hottest: "/projects/hottest",
        byCategoryId: "/projects/category/:id"
    },
    blog: {
        feed: "/feed",
        postById: "/feed/post/:type/:id/*",
        storyById: "/story/:slug",
        writeStory: "/story/write",
        createPost: "/story/create-post",
        catchStory: '/story'
    },
    hackathons: {
        default: "/hackathons"
    },
    donate: {
        default: "/donate"
    },
    profile: {
        editProfile: "/edit-profile/*",
        byId: "/profile/:id/*",
    },
    tournament: {
        byId: "/tournaments/:id/*",
    },
    auth: {
        login: "/login",
        logout: "/logout",
    }
}