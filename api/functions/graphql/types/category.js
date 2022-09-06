const {
    intArg,
    objectType,
    extendType,
    nonNull,
} = require('nexus');
const { prisma } = require('../../../prisma');
const resolveImgObjectToUrl = require('../../../utils/resolveImageUrl');


const Category = objectType({
    name: 'Category',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.string('cover_image', {
            async resolve(parent) {
                const imgObject = await prisma.hostedImage.findUnique({
                    where: {
                        id: parent.cover_image_id
                    }
                });

                return resolveImgObjectToUrl(imgObject);
            }
        });
        t.string('icon');


        t.nonNull.int('votes_sum', {
            async resolve(parent) {
                const projects = await prisma.category.findUnique({ where: { id: parent.id } }).project()
                return projects.reduce((total, project) => total + project.votes_count, 0);
            }
        });
        t.nonNull.int('apps_count', {
            async resolve(parent) {
                const projects = await prisma.category.findUnique({ where: { id: parent.id } }).project();
                return projects.length;

            }
        });

        t.nonNull.list.nonNull.field('project', {
            type: "Project",
            resolve: (parent) => {
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
            resolve: async () => {
                const categories = await prisma.category.findMany({
                    include: {
                        _count: {
                            select: {
                                project: true
                            }
                        }
                    }
                })
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
            resolve(parent, { id }) {
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