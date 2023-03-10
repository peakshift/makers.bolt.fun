import { MOCK_DATA } from "./data";
import {
  GetMakersInTournamentQueryVariables,
  Query,
  QueryGetFeedArgs,
  QueryGetPostByIdArgs,
  TournamentMakerHackingStatusEnum,
  User,
} from "src/graphql";
import { Chance } from "chance";
import { tags } from "./data/tags";
import { hackathons } from "./data/hackathon";
import { shuffle } from "src/utils/helperFunctions";
import { Nullable } from "remirror";

const chance = new Chance();

export function getCategory(id: number) {
  const category = MOCK_DATA.categories.find((c) => c.id === id)!;
  return {
    ...category,
    project: MOCK_DATA.projects.filter((p) => p.category.id === id),
  };
}

export function projectsByCategory(id: number) {
  return MOCK_DATA.projects.filter((p) => p.category.id === id);
}

export function allCategories() {
  return MOCK_DATA.categories.map((c) => ({
    ...c,
    project: projectsByCategory(c.id),
  }));
}

export function newProjects() {
  return shuffle(MOCK_DATA.projects).slice(0, 10);
}

export function getProject(id: Nullable<number>, tag: Nullable<string>) {
  if (id) return MOCK_DATA.projects.find((p) => p.id === id);
  return MOCK_DATA.projects.find((p) => p.hashtag === tag);
}

export function searchProjects(search: string) {
  const regexSearch = new RegExp(search, "i");
  return MOCK_DATA.projects.filter((project) => {
    return (
      regexSearch.test(project.title) ||
      regexSearch.test(project.category.title)
    );
  });
}

export function hottestProjects() {
  return MOCK_DATA.projects
    .sort((p1, p2) => p2.votes_count - p1.votes_count)
    .slice(0, 20);
}

export function getFeed(args: QueryGetFeedArgs): Query["getFeed"] {
  const take = args.take ?? 10;
  const skip = args.skip ?? 0;
  return MOCK_DATA.feed.slice(skip, skip + take);
}

export function getPostById(args: QueryGetPostByIdArgs): Query["getPostById"] {
  return MOCK_DATA.feed.find((p) => p.id === args.id)!;
}

export function getTrendingPosts(): Query["getTrendingPosts"] {
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
    ...MOCK_DATA["user"],
    __typename: "User",
  } as User;
}

export function profile() {
  return { ...MOCK_DATA["user"], __typename: "User" } as User;
}

export function getAllMakersRoles() {
  return MOCK_DATA["allMakersRoles"];
}

export function getAllMakersSkills() {
  return MOCK_DATA["allMakersSkills"];
}
export function searchUsers(value: string) {
  return MOCK_DATA["users"].filter(
    (u) => u.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}

export function getMyDrafts(): Query["getMyDrafts"] {
  return MOCK_DATA["posts"].stories;
}

export function getTournamentById(id: number) {
  return MOCK_DATA["tournaments"][0];
}

export function getMakersInTournament(
  vars: GetMakersInTournamentQueryVariables
) {
  const take = vars.take ?? 15;
  const skip = vars.skip ?? 0;

  const offsetStart = skip;
  const offsetEnd = offsetStart + take;

  const allMakers = MOCK_DATA.users
    .slice(1)
    .filter((u) => {
      if (!vars.search) return true;
      return [u.name, u.jobTitle].some(
        (attr) => attr?.search(new RegExp(vars.search!, "i")) !== -1
      );
    })
    .filter((u) => {
      if (!vars.roleId) return true;
      return u.roles.some((r) => r.id === vars.roleId);
    })
    .slice(offsetStart, offsetEnd + 1)
    .map((u) => ({
      user: u as User,
      hacking_status: TournamentMakerHackingStatusEnum.OpenToConnect,
    }));
  return {
    hasNext: allMakers.length === take + 1,
    hasPrev: skip !== 0,
    makers: allMakers.slice(0, take),
  };
}
