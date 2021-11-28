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
  Mutation: {
    vote: async (_source, args, context) => {
      const project = await context.prisma.project.findUnique({where: { id: args.project_id }});
      console.log(project)
      return context.prisma.vote.create({
        data: {
          project_id: project.id,
          amount_in_sat: args.amount_in_sat,
        }
      });
    },
  },
};
