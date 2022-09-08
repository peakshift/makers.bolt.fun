
import { graphql } from 'msw'
import { allCategories, getAllHackathons, getAllMakersRoles, getAllMakersSkills, getCategory, getFeed, getMakersInTournament, getMyDrafts, getPostById, getProject, getTournamentById, getTrendingPosts, hottestProjects, me, newProjects, popularTags, profile, projectsByCategory, searchProjects } from './resolvers'
import {
    NavCategoriesQuery,
    ExploreProjectsQuery,
    SearchProjectsQuery,
    SearchProjectsQueryVariables,
    CategoryPageQuery,
    CategoryPageQueryVariables,
    ProjectDetailsQuery,
    ProjectDetailsQueryVariables,
    HottestProjectsQuery,
    HottestProjectsQueryVariables,
    AllCategoriesQuery,
    AllCategoriesQueryVariables,
    FeedQuery,
    PostDetailsQuery,
    PostDetailsQueryVariables,
    FeedQueryVariables,
    TrendingPostsQuery,
    PopularTagsQuery,
    PopularTagsQueryVariables,
    GetHackathonsQuery,
    GetHackathonsQueryVariables,
    OfficialTagsQuery,
    OfficialTagsQueryVariables,
    DonationsStatsQuery,
    MeQuery,
    ProfileQuery,
    GetMyDraftsQuery,
    MyProfileAboutQuery,
    MyProfilePreferencesQuery,
    GetTournamentByIdQuery,
    MyProfileRolesSkillsQuery,
    GetAllRolesQuery,
    GetMakersInTournamentQuery,
    GetMakersInTournamentQueryVariables,
    MeTournamentQuery,
} from 'src/graphql'

const delay = (ms = 1000) => new Promise((res) => setTimeout(res, ms + Math.random() * 1000))

export const handlers = [

    graphql.query<NavCategoriesQuery>('NavCategories', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                allCategories: allCategories()
            })
        )
    }),

    graphql.query<AllCategoriesQuery, AllCategoriesQueryVariables>('AllCategories', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                allCategories: allCategories()
            })
        )
    }),

    graphql.query<ExploreProjectsQuery>('ExploreProjects', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                allCategories: allCategories(),
                newProjects: newProjects(),
                hottestProjects: hottestProjects()
            })
        )
    }),

    graphql.query<CategoryPageQuery, CategoryPageQueryVariables>('CategoryPage', async (req, res, ctx) => {
        await delay()
        const { categoryId } = req.variables

        return res(
            ctx.data({
                projectsByCategory: projectsByCategory(categoryId),
                getCategory: getCategory(categoryId)!
            })
        )
    }),


    graphql.query<SearchProjectsQuery, SearchProjectsQueryVariables>('SearchProjects', async (req, res, ctx) => {
        await delay()
        const { search } = req.variables

        return res(
            ctx.data({
                searchProjects: searchProjects(search),
            })
        )
    }),

    graphql.query<ProjectDetailsQuery, ProjectDetailsQueryVariables>('ProjectDetails', async (req, res, ctx) => {
        await delay()
        const { projectId } = req.variables

        return res(
            ctx.data({
                getProject: getProject(projectId) as any
            })
        )
    }),

    graphql.query<HottestProjectsQuery, HottestProjectsQueryVariables>('HottestProjects', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                hottestProjects: hottestProjects()
            })
        )
    }),

    graphql.query<PopularTagsQuery, PopularTagsQueryVariables>('PopularTags', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                popularTags: popularTags()
            })
        )
    }),

    graphql.query<OfficialTagsQuery, OfficialTagsQueryVariables>('OfficialTags', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                officialTags: popularTags()
            })
        )
    }),


    graphql.query<FeedQuery, FeedQueryVariables>('Feed', async (req, res, ctx) => {
        await delay()
        const { take, skip } = req.variables;
        return res(
            ctx.data({
                getFeed: getFeed({ take, skip, sortBy: null, tag: null })
            })
        )
    }),

    graphql.query<PostDetailsQuery, PostDetailsQueryVariables>('PostDetails', async (req, res, ctx) => {
        await delay()
        const { id, type } = req.variables

        return res(
            ctx.data({
                getPostById: getPostById({
                    id,
                    type
                })
            })
        )
    }),


    graphql.query<TrendingPostsQuery>('TrendingPosts', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                getTrendingPosts: getTrendingPosts()
            })
        )
    }),


    graphql.query<GetHackathonsQuery, GetHackathonsQueryVariables>('getHackathons', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                getAllHackathons: getAllHackathons()
            })
        )
    }),


    graphql.query<DonationsStatsQuery>('DonationsStats', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                getDonationsStats: {
                    applications: '32',
                    donations: '2600',
                    prizes: "$2.5k",
                    touranments: "1",
                }
            })
        )
    }),

    graphql.query<MeQuery>('Me', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                me: me()
            })
        )
    }),


    graphql.query<MyProfileAboutQuery>('MyProfileAbout', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                me: me(),
            })
        )
    }),


    graphql.query<MyProfileRolesSkillsQuery>('MyProfileRolesSkills', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                me: { ...me() },
                getAllMakersRoles: getAllMakersRoles(),
                getAllMakersSkills: getAllMakersSkills(),
            })
        )
    }),


    graphql.query<MyProfilePreferencesQuery>('MyProfilePreferences', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                me: me(),
            })
        )
    }),


    graphql.query<MyProfileRolesSkillsQuery>('MyProfileRolesSkills', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                me: { ...me() },
                getAllMakersRoles: getAllMakersRoles(),
                getAllMakersSkills: getAllMakersSkills(),
            })
        )
    }),


    graphql.query<ProfileQuery>('profile', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                profile: profile()
            })
        )
    }),

    graphql.query<GetMyDraftsQuery>('GetMyDrafts', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                getMyDrafts: getMyDrafts()
            })
        )
    }),



    graphql.query<GetTournamentByIdQuery>('GetTournamentById', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                getTournamentById: getTournamentById(12),
                getMakersInTournament: getMakersInTournament({ roleId: null, search: null, skip: null, take: 4, tournamentId: 12 }),
                me: { ...me() }
            })
        )
    }),

    graphql.query<MeTournamentQuery>('MeTournament', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                me: { ...me() }
            })
        )
    }),

    graphql.query<GetMakersInTournamentQuery, GetMakersInTournamentQueryVariables>('GetMakersInTournament', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                getMakersInTournament: getMakersInTournament(req.variables)
            })
        )
    }),

    graphql.query<GetAllRolesQuery>('GetAllRoles', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                getAllMakersRoles: getAllMakersRoles()
            })
        )
    }),

]