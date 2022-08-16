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
        type: "edit-story",
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
        type: "edit-project",
        id?: number,
    }

export function createRoute(options: RouteOptions) {


    if (options.type === "post")
        return `/blog/post/${options.postType.toLowerCase()}/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");

    if (options.type === "story")
        return `/blog/post/story/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");


    if (options.type === "edit-story")
        return `/blog/create-post` + (options.id ? `?id=${options.id}` : '')

    if (options.type === "bounty")
        return `/blog/post/bounty/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");


    if (options.type === "question")
        return `/blog/post/question/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");


    if (options.type === "profile")
        return `/profile/${options.id}`
            + (options.username ? `/${toSlug(options.username)}` : "");

    if (options.type === 'edit-project')
        return `/projects/list-project` + (options.id ? `?id=${options.id}` : '')

    return ""
}

export const PAGES_ROUTES = {
    projects: {
        default: "/projects",
        hottest: "/projects/hottest",
        byCategoryId: "/projects/category/:id",
        listProject: "/projects/list-project/*"
    },
    blog: {
        feed: "/blog",
        postById: "/blog/post/:type/:id/*",
        createPost: "/blog/create-post"
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
    auth: {
        login: "/login",
        logout: "/logout",
    }
}