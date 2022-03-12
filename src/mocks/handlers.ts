
import { graphql } from 'msw'
import { allCategories, getCategory, getProject, newProjects, projectsByCategory } from './resolvers'

export const handlers = [

    graphql.query('PROJECTS_IN_CATEGORY_QUERY', (req, res, ctx) => {
        const { categoryId } = req.variables


        return res(
            ctx.data({
                projectsByCategory: projectsByCategory(categoryId),
                getCategory: getCategory(categoryId)
            })
        )
    }),

    graphql.query('AllCategoriesProjects', (req, res, ctx) => {
        return res(
            ctx.data({
                allCategories: allCategories(),
                newProjects: newProjects()
            })
        )
    }),

    graphql.query('AllCategories', (req, res, ctx) => {
        return res(
            ctx.data({
                allCategories: allCategories()
            })
        )
    }),

    graphql.query('Project', (req, res, ctx) => {
        const { projectId } = req.variables

        return res(
            ctx.data({
                getProject: getProject(projectId)
            })
        )
    }),
]