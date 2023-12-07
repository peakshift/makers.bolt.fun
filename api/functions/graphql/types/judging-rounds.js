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

// model TournamentJudgingRoundJudgeScore {
//   id Int @id @default(autoincrement())

//   round_id String
//   round    TournamentJudgingRound @relation(fields: [round_id], references: [id])

//   judge_id Int
//   judge    User @relation(fields: [judge_id], references: [id])

//   project_id Int
//   project    Project @relation(fields: [project_id], references: [id])

//   scores Json

//   @@unique([round_id, judge_id, project_id])
// }

const TournamentJudgingRoundProjectScore = objectType({
  name: "TournamentJudgingRoundProjectScore",
  definition(t) {
    t.int("value_proposition");
    t.int("innovation");
    t.int("bitcoin_integration_and_scalability");
    t.int("execution");
    t.int("ui_ux_design");
    t.int("transparency");
    t.int("je_ne_sais_quoi");
  },
});

const TournamentJudgingRoundJudgeScore = objectType({
  name: "TournamentJudgingRoundJudgeScore",
  definition(t) {
    t.nonNull.int("id");

    t.nonNull.field("judge", {
      type: "User",
      resolve: async (parent, _, ctx) => {
        return prisma.tournamentJudgingRoundJudgeScore
          .findUnique({
            where: { id: parent.id },
          })
          .judge();
      },
    });

    t.nonNull.field("project", {
      type: "Project",
      resolve: async (parent, _, ctx) => {
        return prisma.tournamentJudgingRoundJudgeScore
          .findUnique({
            where: { id: parent.id },
          })
          .project();
      },
    });

    t.nonNull.field("scores", {
      type: TournamentJudgingRoundProjectScore,
      resolve: async (parent, _, ctx) => {
        return prisma.tournamentJudgingRoundJudgeScore
          .findUnique({
            where: { id: parent.id },
          })
          .then((res) => {
            const data = res.scores ?? {};
            return {
              value_proposition: data.value_proposition,
              innovation: data.innovation,
              bitcoin_integration_and_scalability:
                data.bitcoin_integration_and_scalability,
              execution: data.execution,
              ui_ux_design: data.ui_ux_design,
              transparency: data.transparency,
              je_ne_sais_quoi: data.je_ne_sais_quoi,
            };
          });
      },
    });
  },
});

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

    t.nonNull.list.nonNull.field("my_scores", {
      type: TournamentJudgingRoundJudgeScore,
      resolve: async (parent, _, ctx) => {
        if (!ctx.user?.id) throw new ApolloError("User not found", "404");

        return prisma.tournamentJudgingRoundJudgeScore.findMany({
          where: {
            judge_id: ctx.user?.id,
            round_id: parent.id,
          },
        });
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
      type: "Tournament",
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

        return prisma.tournament.findUnique({
          where: { id: tournament_id },
        });
      },
    });
  },
});

const ScoreObjectInput = inputObjectType({
  name: "ScoreObjectInput",
  definition(t) {
    t.int("value_proposition");
    t.int("innovation");
    t.int("bitcoin_integration_and_scalability");
    t.int("execution");
    t.int("ui_ux_design");
    t.int("transparency");
    t.int("je_ne_sais_quoi");
  },
});

const ScoreProjectInput = inputObjectType({
  name: "ScoreProjectInput",
  definition(t) {
    t.nonNull.string("round_id");
    t.nonNull.int("project_id");
    t.nonNull.field("scores", {
      type: ScoreObjectInput,
    });
  },
});

const scoreTournamentProject = extendType({
  type: "Mutation",
  definition(t) {
    t.field("scoreTournamentProject", {
      type: TournamentJudgingRoundJudgeScore,
      args: { input: ScoreProjectInput },
      resolve: async (_, args, ctx) => {
        const userId = ctx.user?.id;

        if (!userId) throw new ApolloError("Not authorized", "401");

        const { input } = args;

        const { round_id, project_id, scores } = input;

        const isJudgeInRound =
          await prisma.tournamentJudgingRoundJudge.findFirst({
            where: {
              round_id: args.input.round_id,
              judge_id: userId,
            },
          });

        if (!isJudgeInRound) {
          throw new ApolloError(
            "You are not allowed to score this project.",
            "403"
          );
        }

        const judgingRound = await prisma.tournamentJudgingRound.findUnique({
          where: { id: round_id },
          include: {
            projects: {
              where: {
                project_id: project_id,
              },
            },
          },
        });

        const projectExistInRound = judgingRound?.projects?.length > 0;

        if (!projectExistInRound) {
          throw new ApolloError(
            "This project is not part of this judging round.",
            "404"
          );
        }

        const judgingRoundJudgeScore =
          await prisma.tournamentJudgingRoundJudgeScore.upsert({
            where: {
              round_id_judge_id_project_id: {
                round_id: round_id,
                judge_id: ctx.user.id,
                project_id: project_id,
              },
            },
            update: {
              scores,
            },
            create: {
              round_id: round_id,
              judge_id: ctx.user?.id,
              project_id: project_id,
              scores,
            },
          });

        return judgingRoundJudgeScore;
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
  scoreTournamentProject,
};
