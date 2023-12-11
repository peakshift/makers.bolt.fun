import { toSlug } from "../helperFunctions";

type RouteOptions =
  | {
      type: "login";
    }
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
      type: "tournaments";
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
      tab?: "basic-info" | "roles-skills" | "nostr" | "security";
    }
  | {
      type: "tournament";
      idOrSlug: string | number;
      tab?: "overview" | "events" | "makers" | "projects";
    }
  | {
      type: "admin-badges";
      page?: "list" | "create" | "update" | "details";
      idOrSlug?: string | number;
    }
  | {
      type: "judging-rounds";
      page: "list";
      tournamentIdOrSlug: number | string;
    }
  | {
      type: "judging-rounds";
      page: "create";
      tournamentIdOrSlug: number | string;
    }
  | {
      type: "judging-rounds";
      page: "update";
      tournamentIdOrSlug: number | string;
      roundId: string;
    }
  | {
      type: "judging-rounds";
      page: "details";
      tournamentIdOrSlug: number | string;
      roundId: string;
    }
  | {
      type: "judging-rounds";
      page: "judge-page";
      tournamentIdOrSlug: number | string;
      roundId: string;
    };

export function createRoute(options: RouteOptions) {
  if (options.type === "login") return "/login";

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

  if (options.type === "edit-profile")
    return "/edit-profile" + (options.tab ? `/${options.tab}` : "");

  if (options.type === "tournament")
    return (
      `/tournaments/${options.idOrSlug}` +
      (options.tab ? `/${options.tab}` : "")
    );

  if (options.type === "hangout") return "/hangout";

  if (options.type === "projects-page") return "/projects";

  if (options.type === "tournaments") return "/tournaments";

  if (options.type === "project") return `/project/${options.tag}`;

  if (options.type === "edit-project")
    return `/projects/list-project` + (options.id ? `?id=${options.id}` : "");

  if (options.type === "admin-badges") {
    if (options.page === "list") return "/admin/badges";
    if (options.page === "create") return "/admin/badges/create";
    if (options.page === "update")
      return `/admin/badges/${options.idOrSlug}/update`;
    if (options.page === "details") return `/admin/badges/${options.idOrSlug}`;
  }

  if (options.type === "judging-rounds") {
    if (options.page === "list")
      return `/admin/tournament/${options.tournamentIdOrSlug}/judging`;
    if (options.page === "create")
      return `/admin/tournament/${options.tournamentIdOrSlug}/judging/create`;
    if (options.page === "update")
      return `/admin/tournament/${options.tournamentIdOrSlug}/judging/${options.roundId}/update`;
    if (options.page === "details")
      return `/admin/tournament/${options.tournamentIdOrSlug}/judging/${options.roundId}`;

    if (options.page === "judge-page")
      return `/tournament/${options.tournamentIdOrSlug}/judging/${options.roundId}/judge`;
  }

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
    default: "/tournaments",
    byId: "/tournaments/:id/*",
  },
  home: {
    default: "/home",
  },
  landingPage: {
    buildOnBitcoin: "/Build-On-Bitcoin",
  },
  auth: {
    login: "/login",
    loginEmail: "/login-email",
    logout: "/logout",
  },
};
