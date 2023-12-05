const { ApolloError } = require("apollo-server-lambda");
const {
  objectType,
  extendType,
  inputObjectType,
  stringArg,
  nonNull,
  intArg,
} = require("nexus");
const {
  isAdmin,
  isTournamentOrganizer,
} = require("../../../auth/utils/helperFuncs");
const { prisma } = require("../../../prisma");
const cacheService = require("../../../services/cache.service");
const { queueService } = require("../../../services/queue-service");
const { toSlug } = require("../../../utils/helpers");

const TournamentJudgingRound = objectType({
  name: "TournamentJudgingRound",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.date("end_date");
    t.nonNull.date("createdAt");
    t.nonNull.field("tournament", {
      type: "Tournament",
      resolve: async (parent, _, ctx) => {
        return prisma.tournamentJudgingRound
          .findUnique({
            where: { id: parent.id },
          })
          .tournament();
      },
    });
    t.nonNull.list.nonNull.field("projects", {
      type: "Project",
      resolve: async (parent, _, ctx) => {
        return prisma.tournamentJudgingRound
          .findUnique({
            where: { id: parent.id },
          })
          .projects()
          .then((res) =>
            prisma.project.findMany({
              where: {
                id: {
                  in: res.map((r) => r.project_id),
                },
              },
            })
          );
      },
    });

    t.nonNull.list.nonNull.field("judges", {
      type: "User",
      resolve: async (parent, _, ctx) => {
        return prisma.tournamentJudgingRound
          .findUnique({
            where: { id: parent.id },
          })
          .judges()
          .then((res) =>
            prisma.user.findMany({
              where: {
                id: {
                  in: res.map((r) => r.judge_id),
                },
              },
            })
          );
      },
    });
  },
});

const getJudgingRoundById = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getJudgingRoundById", {
      type: TournamentJudgingRound,
      args: {
        judgingRoundId: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const { judgingRoundId } = args;

        const judgingRound = await prisma.tournamentJudgingRound.findUnique({
          where: { id: judgingRoundId },
        });

        const isOrganizer = isTournamentOrganizer(
          ctx.user?.id,
          judgingRound.tournament_id
        );

        if (isOrganizer) {
          return judgingRound;
        }

        const isJudge = await prisma.tournamentJudgingRoundJudge.findFirst({
          where: {
            round_id: judgingRoundId,
            judge_id: ctx.user?.id,
          },
        });

        if (isJudge) {
          return judgingRound;
        }

        throw new ApolloError(
          "You are not allowed to view this judging round.",
          "403"
        );
      },
    });
  },
});

const CreateOrUpdateJudgingRoundInput = inputObjectType({
  name: "CreateOrUpdateJudgingRoundInput",
  definition(t) {
    t.string("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.date("end_date");
    t.nonNull.int("tournament_id");

    t.nonNull.list.nonNull.int("judges_ids");
    t.nonNull.list.nonNull.int("projects_ids");
  },
});

const createOrUpdateJudgingRound = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createOrUpdateJudgingRound", {
      type: TournamentJudgingRound,
      args: { input: CreateOrUpdateJudgingRoundInput },
      resolve: async (_, args, ctx) => {
        const { input } = args;

        const {
          id,
          title,
          description,
          end_date,
          tournament_id,
          judges_ids,
          projects_ids,
        } = input;

        const isOrganizer = isTournamentOrganizer(ctx.user?.id, tournament_id);

        if (!isOrganizer) {
          throw new ApolloError(
            "You are not allowed to create or update this judging round.",
            "403"
          );
        }

        const judgingRound = await prisma.tournamentJudgingRound.upsert({
          where: { id: id ?? "" },
          update: {
            title,
            description,
            end_date,
          },
          create: {
            title,
            description,
            end_date,
            tournament: {
              connect: {
                id: tournament_id,
              },
            },
          },
        });

        const [judges, projects] = await Promise.all([
          prisma.tournamentJudgingRoundJudge.findMany({
            where: {
              round_id: judgingRound.id,
            },
          }),
          prisma.tournamentJudgingRoundProject.findMany({
            where: {
              round_id: judgingRound.id,
            },
          }),
        ]);

        const judgesToDelete = judges.filter(
          (j) => !judges_ids.includes(j.judge_id)
        );

        const judgesToAdd = judges_ids.filter(
          (j) => !judges.map((j) => j.judge_id).includes(j)
        );

        const projectsToDelete = projects.filter(
          (p) => !projects_ids.includes(p.project_id)
        );

        const projectsToAdd = projects_ids.filter(
          (p) => !projects.map((p) => p.project_id).includes(p)
        );

        const updateJudgesTrx = [];

        if (judgesToDelete.length > 0) {
          updateJudgesTrx.push(
            prisma.tournamentJudgingRoundJudge.deleteMany({
              where: {
                judge_id: {
                  in: judgesToDelete.map((j) => j.judge_id),
                },
              },
            })
          );
        }

        if (judgesToAdd.length > 0) {
          updateJudgesTrx.push(
            prisma.tournamentJudgingRoundJudge.createMany({
              data: judgesToAdd.map((j) => ({
                round_id: judgingRound.id,
                judge_id: j,
              })),
            })
          );
        }

        const updateProjectsTrx = [];

        if (projectsToDelete.length > 0) {
          updateProjectsTrx.push(
            prisma.tournamentJudgingRoundProject.deleteMany({
              where: {
                AND: [
                  {
                    project_id: {
                      in: projectsToDelete.map((p) => p.project_id),
                    },
                  },
                  {
                    round_id: judgingRound.id,
                  },
                ],
              },
            })
          );
        }

        if (projectsToAdd.length > 0) {
          updateProjectsTrx.push(
            prisma.tournamentJudgingRoundProject.createMany({
              data: projectsToAdd.map((p) => ({
                round_id: judgingRound.id,
                project_id: p,
              })),
            })
          );
        }

        await Promise.all([
          prisma.$transaction(updateJudgesTrx),
          prisma.$transaction(updateProjectsTrx),
        ]);

        // TODO: Send email to judges

        return judgingRound;
      },
    });
  },
});

module.exports = {
  // Types
  TournamentJudgingRound,
  // Queries
  getJudgingRoundById,
  // Mutations
  createOrUpdateJudgingRound,
};
