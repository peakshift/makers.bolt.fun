
import { graphql } from 'msw'
import { allCategories, getAllHackathons, getCategory, getFeed, getPostById, getProject, getTrendingPosts, hottestProjects, newProjects, popularTopics, projectsByCategory, searchProjects } from './resolvers'
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
    PopularTopicsQuery,
    PopularTopicsQueryVariables,
    GetHackathonsQuery,
    GetHackathonsQueryVariables,
    AllTopicsQuery,
    AllTopicsQueryVariables,
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
                newProjects: newProjects()
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

    graphql.query<PopularTopicsQuery, PopularTopicsQueryVariables>('PopularTopics', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                popularTopics: popularTopics()
            })
        )
    }),

    graphql.query<AllTopicsQuery, AllTopicsQueryVariables>('allTopics', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                allTopics: popularTopics()
            })
        )
    }),


    graphql.query<FeedQuery, FeedQueryVariables>('Feed', async (req, res, ctx) => {
        await delay()
        const { take, skip } = req.variables;
        return res(
            ctx.data({
                getFeed: getFeed({ take, skip, })
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

]