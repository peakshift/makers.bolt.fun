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
const env = require("../../../utils/consts");
const { generateId } = require("../../../utils/generateId");
const { toSlug } = require("../../../utils/helpers");

const TournamentJudgingRoundProjectScore = objectType({
  name: "TournamentJudgingRoundProjectScore",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.string("value");
  },
});

const TournamentJudgingRoundJudgeScore = objectType({
  name: "TournamentJudgingRoundJudgeScore",
  definition(t) {
    t.nonNull.int("id");
    t.string("note");
    t.string("internal_note");

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

    t.nonNull.list.nonNull.field("scores", {
      type: TournamentJudgingRoundProjectScore,
      resolve: async (parent, _, ctx) => {
        return prisma.tournamentJudgingRoundJudgeScore
          .findUnique({
            where: { id: parent.id },
          })
          .then((res) => {
            const data = res.scores ?? [];

            if (Array.isArray(data)) return data;

            // This is for backward compatibility, once all the data is updated, this can be removed
            return Object.entries(data)
              .map(([key, value]) => {
                return {
                  key,
                  value,
                };
              })
              .filter((d) => d.value !== null);
          });
      },
    });
  },
});

const TournamentJudgingRoundScoresSchema = objectType({
  name: "TournamentJudgingRoundScoresSchema",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.string("label");
    t.nonNull.string("type");
    t.boolean("required");
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

    t.nonNull.list.nonNull.field("scores_schema", {
      type: TournamentJudgingRoundScoresSchema,
    });

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

    t.nonNull.boolean("is_judge", {
      resolve: async (parent, _, ctx) => {
        if (!ctx.user?.id) return false;

        return prisma.tournamentJudgingRoundJudge
          .findFirst({
            where: {
              round_id: parent.id,
              judge_id: ctx.user?.id,
            },
          })
          .then(Boolean);
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

const TournamentJudgingRoundScoresSchemaInput = inputObjectType({
  name: "TournamentJudgingRoundScoresSchemaInput",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.string("label");
    t.nonNull.string("type");
    t.boolean("required");
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

    t.nonNull.list.nonNull.field("scores_schema", {
      type: TournamentJudgingRoundScoresSchemaInput,
    });
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
          scores_schema,
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
          select: {
            id: true,
            tournament: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
          update: {
            title,
            description,
            end_date,
            scores_schema,
          },
          create: {
            id: generateId(),
            title,
            description,
            end_date,
            scores_schema,
            tournament: {
              connect: {
                id: tournament_id,
              },
            },
          },
        });

        const [currentJudges, currentProjects] = await Promise.all([
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

        const judgesToDelete = currentJudges.filter(
          (j) => !judges_ids.includes(j.judge_id)
        );

        const judgesIdsToAdd = judges_ids.filter(
          (j) => !currentJudges.map((j) => j.judge_id).includes(j)
        );

        const projectsToDelete = currentProjects.filter(
          (p) => !projects_ids.includes(p.project_id)
        );

        const projectsToAdd = projects_ids.filter(
          (p) => !currentProjects.map((p) => p.project_id).includes(p)
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

        if (judgesIdsToAdd.length > 0) {
          updateJudgesTrx.push(
            prisma.tournamentJudgingRoundJudge.createMany({
              data: judgesIdsToAdd.map((j) => ({
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

        if (judgesIdsToAdd.length > 0) {
          const newlyCreatedJudges = await prisma.user.findMany({
            where: {
              id: {
                in: judgesIdsToAdd,
              },
            },
            select: {
              id: true,
              name: true,
              email: true,
              userEmails: {
                select: {
                  email: true,
                },
              },
            },
          });
          await queueService.emailService.inviteJudgesToJudgingRound({
            judges: newlyCreatedJudges
              .map((judge) => ({
                ...judge,
                email: judge.userEmails.at(0)?.email ?? judge.email,
              }))
              .filter((j) => j.email),
            round_url: `${env.SITE_URL}/judging-round/${judgingRound.id}`,
            tournament_id: tournament_id,
            tournament_title: judgingRound.tournament.title,
          });
        }

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
    t.nonNull.string("key");
    t.nonNull.string("value");
  },
});

const ScoreProjectInput = inputObjectType({
  name: "ScoreProjectInput",
  definition(t) {
    t.nonNull.string("round_id");
    t.nonNull.int("project_id");
    t.string("note");
    t.string("internal_note");
    t.nonNull.list.nonNull.field("scores", {
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

        const { round_id, note, internal_note, project_id, scores } = input;

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
              note,
              internal_note,
            },
            create: {
              round_id: round_id,
              judge_id: ctx.user?.id,
              project_id: project_id,
              scores,
              note,
              internal_note,
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
