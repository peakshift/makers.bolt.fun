
import { graphql } from 'msw'
import { allCategories, getCategory, getProject, hottestProjects, newProjects, projectsByCategory, searchProjects } from './resolvers'

const delay = (ms = 1000) => new Promise((res) => setTimeout(res, ms))

export const handlers = [

    graphql.query('PROJECTS_IN_CATEGORY_QUERY', async (req, res, ctx) => {
        await delay()
        const { categoryId } = req.variables

        return res(
            ctx.data({
                projectsByCategory: projectsByCategory(categoryId),
                getCategory: getCategory(categoryId)
            })
        )
    }),

    graphql.query('SEARCH_PROJECTS_QUERY', async (req, res, ctx) => {
        await delay()
        const { search } = req.variables

        return res(
            ctx.data({
                searchProjects: searchProjects(search),
            })
        )
    }),

    graphql.query('AllCategoriesProjects', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                allCategories: allCategories(),
                newProjects: newProjects()
            })
        )
    }),

    graphql.query('AllCategories', async (req, res, ctx) => {
        await delay()
        return res(
            ctx.data({
                allCategories: allCategories()
            })
        )
    }),

    graphql.query('Project', async (req, res, ctx) => {
        await delay()
        const { projectId } = req.variables

        return res(
            ctx.data({
                getProject: getProject(projectId)
            })
        )
    }),

    graphql.query('HOTTEST_PROJECTS', async (req, res, ctx) => {
        await delay()

        return res(
            ctx.data({
                hottestProjects: hottestProjects()
            })
        )
    }),
]