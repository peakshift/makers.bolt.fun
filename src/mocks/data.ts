import { hackathons } from "./data/hackathon";
import { posts, feed, generatePostComments } from "./data/posts";
import { categories, projects } from "./data/projects";
import { user } from "./data/users";

export const MOCK_DATA = {
    projects,
    categories,
    posts,
    feed,
    hackathons,
    generatePostComments: generatePostComments,
    user: user
}