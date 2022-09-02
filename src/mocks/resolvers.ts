import { MOCK_DATA } from "./data";
import { MyProfile, Query, QueryGetFeedArgs, QueryGetPostByIdArgs, User } from 'src/graphql'
import { Chance } from "chance";
import { tags } from "./data/tags";
import { hackathons } from "./data/hackathon";
import { shuffle } from "src/utils/helperFunctions";

const chance = new Chance()

export function getCategory(id: number) {

    const category = MOCK_DATA.categories.find(c => c.id === id)!;
    return {
        ...category,
        project: MOCK_DATA.projects.filter(p => p.category.id === id)
    }
}


export function projectsByCategory(id: number) {
    return MOCK_DATA.projects.filter(p => p.category.id === id)
}

export function allCategories() {
    return MOCK_DATA.categories.map(c => ({
        ...c,
        project: projectsByCategory(c.id)
    }))
}

export function newProjects() {
    return shuffle(MOCK_DATA.projects).slice(0, 10);
}

export function getProject(projectId: number) {
    return MOCK_DATA.projects.find(p => p.id === projectId)!
}

export function searchProjects(search: string) {
    const regexSearch = new RegExp(search, 'i')
    return MOCK_DATA.projects.filter(project => {
        return regexSearch.test(project.title) || regexSearch.test(project.category.title)
    })
}

export function hottestProjects() {
    return MOCK_DATA.projects.sort((p1, p2) => p2.votes_count - p1.votes_count).slice(0, 20)
}

export function getFeed(args: QueryGetFeedArgs): Query['getFeed'] {
    const take = args.take ?? 10
    const skip = args.skip ?? 0
    return MOCK_DATA.feed.slice(skip, skip + take);
}

export function getPostById(args: QueryGetPostByIdArgs): Query['getPostById'] {

    return MOCK_DATA.feed.find(p => p.id === args.id)!;

}

export function getTrendingPosts(): Query['getTrendingPosts'] {
    return chance.pickset(MOCK_DATA.feed, 5);
}

export function popularTags() {
    return tags;
}

export function getAllHackathons() {
    return hackathons;
}

export function me() {
    return {
        ...MOCK_DATA['user'],
        __typename: "MyProfile",
    } as MyProfile
}



export function profile() {
    return { ...MOCK_DATA['user'], __typename: 'User' } as User
}

export function getAllMakersRoles() {
    return MOCK_DATA['allMakersRoles']
}

export function getAllMakersSkills() {
    return MOCK_DATA['allMakersSkills']
}
export function getMyDrafts(): Query['getMyDrafts'] {
    return MOCK_DATA['posts'].stories;
}