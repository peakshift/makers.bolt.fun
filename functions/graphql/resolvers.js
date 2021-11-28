module.exports = {
  Query: {
    allCategories: async (_source, args, context) => {
      return context.prisma.category.findMany();
    },
    allProjects: async (_source, args, context) => {
      return context.prisma.project.findMany();
    },
    getProject: async (_source, args, context) => {
      return context.prisma.project.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  //Mutation: {
  //  vote: async (_source, args, context) => {},
  //},
};
