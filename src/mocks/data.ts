import { hackathons } from "./data/hackathon";
import { posts, feed, generatePostComments } from "./data/posts";
import { categories, projects } from "./data/projects";
import { tournaments } from "./data/tournament";
import { allMakersRoles, allMakersSkills, users } from "./data/users";

export const MOCK_DATA = {
    projects,
    categories,
    posts,
    feed,
    hackathons,
    generatePostComments: generatePostComments,
    user: users[0],
    users: users,
    tournaments: tournaments,
    allMakersRoles: allMakersRoles,
    allMakersSkills: allMakersSkills,
}