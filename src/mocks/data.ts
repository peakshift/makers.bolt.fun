import { posts, feed, generatePostComments } from "./data/posts";
import { categories, projects } from "./data/projects";

export const MOCK_DATA = {
    projects,
    categories,
    posts,
    feed,
    generatePostComments: generatePostComments
}