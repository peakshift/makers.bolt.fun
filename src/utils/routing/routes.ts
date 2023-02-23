import { toSlug } from "../helperFunctions";

type RouteOptions =
  | {
      type: "post";
      id: string | number;
      postType: string;
      title?: string;
      username?: string;
    }
  | {
      type: "tag-page";
      tag: string;
    }
  | {
      type: "story";
      id: string | number;
      title?: string;
      username?: string;
    }
  | {
      type: "nostr-story";
      id: string;
    }
  | {
      type: "write-story";
      initData?: Record<string, any>;
    }
  | {
      type: "bounty";
      id: string | number;
      title?: string;
      username?: string;
    }
  | {
      type: "question";
      id: string | number;
      title?: string;
      username?: string;
    }
  | {
      type: "profile";
      id: string | number;
      username?: string;
    }
  | {
      type: "projects-page";
    }
  | {
      type: "hangout";
    }
  | {
      type: "project";
      tag: string;
    }
  | {
      type: "edit-project";
      id?: number;
    }
  | {
      type: "edit-profile";
    }
  | {
      type: "tournament";
      id: string | number;
      tab?: "overview" | "events" | "makers" | "projects";
    };

export function createRoute(options: RouteOptions) {
  if (
    (options.type === "post" && options.postType.toLowerCase() === "story") ||
    options.type === "story"
  ) {
    const onlyId = !options.title;
    return (
      "/story/" +
      // + (options.username ? `${toSlug(options.username)}-` : "")
      (options.title ? `${toSlug(options.title)}-` : "") +
      (!onlyId ? "-" : "") +
      `${options.id}`
    );
  }

  if (options.type === "nostr-story") {
    return "/note/" + options.id;
  }

  if (options.type === "write-story") {
    const searchParams = new URLSearchParams({
      ...options.initData,
    }).toString();
    return "/story/write?" + searchParams;
  }

  if (options.type === "tag-page") return `/t/${options.tag}`;

  if (
    (options.type === "post" && options.postType.toLowerCase() === "bounty") ||
    options.type === "bounty"
  )
    return (
      `/blog/post/bounty/${options.id}` +
      (options.title ? `/${toSlug(options.title)}` : "")
    );

  if (
    (options.type === "post" &&
      options.postType.toLowerCase() === "question") ||
    options.type === "question"
  )
    return (
      `/blog/post/question/${options.id}` +
      (options.title ? `/${toSlug(options.title)}` : "")
    );

  if (options.type === "profile")
    return (
      `/profile/${options.id}` +
      (options.username ? `/${toSlug(options.username)}` : "")
    );

  if (options.type === "edit-profile") return "/edit-profile";

  if (options.type === "tournament")
    return (
      `/tournaments/${options.id}` + (options.tab ? `/${options.tab}` : "")
    );

  if (options.type === "hangout") return "/hangout";

  if (options.type === "projects-page") return "/projects";

  if (options.type === "project") return `/project/${options.tag}`;

  if (options.type === "edit-project")
    return `/projects/list-project` + (options.id ? `?id=${options.id}` : "");

  return "";
}

export const PAGES_ROUTES = {
  projects: {
    default: "/projects",
    hottest: "/projects/hottest",
    byCategoryId: "/projects/category/:id",
    listProject: "/projects/list-project",
    projectPage: "/project/:tag",
    catchProject: "/project",
  },
  hangout: {
    default: "/hangout",
  },
  blog: {
    feed: "/feed",
    postById: "/feed/post/:type/:id/*",
    storyById: "/story/:slug",
    writeStory: "/story/write",
    createPost: "/story/create-post",
    catchStory: "/story",
    nostrStoryById: "/note/:id",
    tagPage: "/t/:tag",
    topicsPage: "/topics",
  },
  hackathons: {
    default: "/hackathons",
  },
  donate: {
    default: "/donate",
  },
  profile: {
    editProfile: "/edit-profile/*",
    byId: "/profile/:id/*",
  },
  tournament: {
    byId: "/tournaments/:id/*",
  },
  home: {
    default: "/home",
  },
  auth: {
    login: "/login",
    logout: "/logout",
  },
};
