import { toSlug } from "../helperFunctions";

type RouteOptions =
    | {
        type: 'post',
        id: string | number,
        postType: string,
        title?: string,
        username?: string,
    }
    | {
        type: 'story',
        id: string | number,
        title?: string,
        username?: string,
    }
    | {
        type: 'bounty',
        id: string | number,
        title?: string,
        username?: string,
    }
    | {
        type: 'question',
        id: string | number,
        title?: string,
        username?: string,
    }
    | {
        type: 'profile',
        id: string | number,
        username?: string,
    }

export function createRoute(options: RouteOptions) {


    if (options.type === 'post')
        return `/blog/post/${options.postType}/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");

    if (options.type === 'story')
        return `/blog/post/story/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");

    if (options.type === 'bounty')
        return `/blog/post/bounty/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");


    if (options.type === 'question')
        return `/blog/post/question/${options.id}`
            + (options.title ? `/${toSlug(options.title)}` : "");


    if (options.type === 'profile')
        return `/profile/${options.id}`
            + (options.username ? `/${toSlug(options.username)}` : "");

    return ''
}