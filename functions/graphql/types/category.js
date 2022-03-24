const {
    intArg,
    objectType,
    extendType,
    nonNull,
} = require('nexus');


const Category = objectType({
    name: 'Category',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.string('cover_image');
        t.string('icon');


        t.nonNull.int('votes_sum', {
            async resolve(parent, _, { prisma }) {
                const projects = await prisma.category.findUnique({ where: { id: parent.id } }).project();
                return projects.reduce((total, project) => total + project.votes_count, 0);
            }
        });
        t.nonNull.int('apps_count', {
            async resolve(parent, _, { prisma }) {
                const projects = await prisma.category.findUnique({ where: { id: parent.id } }).project();
                return projects.length;

            }
        });

        t.nonNull.list.nonNull.field('project', {
            type: "Project",
            resolve: (parent, _, { prisma }) => {
                return parent.project ?? prisma.category.findUnique({
                    where: { id: parent.id }
                }).project()
            }
        })
    }
})

const allCategoriesQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('allCategories', {
            type: "Category",
            resolve: async (parent, args, { prisma }) => {
                const categories = await prisma.category.findMany({
                    include: {
                        _count: {
                            select: {
                                project: true
                            }
                        }
                    }
                })
                console.log(categories);
                categories.sort((c1, c2) => c2._count.project - c1._count.project)
                return categories;
            }
        })
    }
})

const getCategory = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field('getCategory', {
            type: "Category",
            args: {
                id: nonNull(intArg())
            },
            resolve(parent, { id }, { prisma }) {
                return prisma.category.findUnique({
                    where: { id }
                })
            }
        })
    }
})

module.exports = {
    // Types
    Category,

    // Queries
    allCategoriesQuery,
    getCategory
}