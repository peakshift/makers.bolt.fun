const {
  intArg,
  objectType,
  stringArg,
  extendType,
  nonNull,
  enumType,
  inputObjectType,
  booleanArg,
} = require("nexus");
const { resolveImgObjectToUrl } = require("../../../utils/resolveImageUrl");
const { prisma } = require("../../../prisma");
const {
  paginationArgs,
  removeNulls,
  defaultPrismaSelectFields,
} = require("./helpers");
const { ApolloError } = require("@apollo/client");
const { PrismaSelect } = require("@paljs/plugins");
const {
  invalidateTournamentProjects,
} = require("../../../services/cache.service");
const { ImageInput } = require("./misc");

const TournamentPrize = objectType({
  name: "TournamentPrize",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.string("image");

    t.nonNull.list.nonNull.field("positions", {
      type: objectType({
        name: "TournamentPrizePosition",
        definition(t) {
          t.nonNull.string("position");
          t.nonNull.string("reward");
          t.string("project");
        },
      }),
    });

    t.list.nonNull.field("additional_prizes", {
      type: objectType({
        name: "TournamentPrizeAdditionalPrize",
        definition(t) {
          t.nonNull.string("text");
          t.string("url");
        },
      }),
    });
  },
});

const TournamentPrizeInput = inputObjectType({
  name: "TournamentPrizeInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.string("image");

    t.nonNull.list.nonNull.field("positions", {
      type: inputObjectType({
        name: "TournamentPrizePositionInput",
        definition(t) {
          t.nonNull.string("position");
          t.nonNull.string("reward");
          t.string("project");
        },
      }),
    });
  },
});

const TournamentTrack = objectType({
  name: "TournamentTrack",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("icon");
  },
});

const TournamentTrackInput = inputObjectType({
  name: "TournamentTrackInput",
  definition(t) {
    t.int("id");
    t.nonNull.string("title");
    t.nonNull.string("icon");
  },
});

const TournamentJudge = objectType({
  name: "TournamentJudge",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("company");
    t.nonNull.string("avatar", {
      async resolve(parent) {
        return (
          resolveImgObjectToUrl(parent.avatar_rel) ||
          prisma.tournamentJudge
            .findUnique({ where: { id: parent.id } })
            .avatar_rel()
            .then(resolveImgObjectToUrl)
        );
      },
    });
  },
});

const TournamentJudgeInput = inputObjectType({
  name: "TournamentJudgeInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("company");
    t.nonNull.field("cover_image", {
      type: ImageInput,
    });
  },
});

const TournamentFAQ = objectType({
  name: "TournamentFAQ",
  definition(t) {
    t.nonNull.string("question");
    t.nonNull.string("answer");
  },
});

const TournamentFAQInput = inputObjectType({
  name: "TournamentFAQInput",
  definition(t) {
    t.nonNull.string("question");
    t.nonNull.string("answer");
  },
});

const TournamentContact = objectType({
  name: "TournamentContact",
  definition(t) {
    t.nonNull.string("type");
    t.nonNull.string("url");
  },
});

const TournamentContactInput = inputObjectType({
  name: "TournamentContactInput",
  definition(t) {
    t.nonNull.string("type");
    t.nonNull.string("url");
  },
});

const TournamentPartner = objectType({
  name: "TournamentPartner",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.list.nonNull.field("items", {
      type: objectType({
        name: "TournamentPartnerItem",
        definition(t) {
          t.nonNull.string("image");
          t.nonNull.string("url");
          t.boolean("isBigImage");
        },
      }),
    });
  },
});

const TournamentPartnerInput = inputObjectType({
  name: "TournamentPartnerInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.list.nonNull.field("items", {
      type: inputObjectType({
        name: "TournamentPartnerItemInput",
        definition(t) {
          t.nonNull.string("image");
          t.nonNull.string("url");
          t.boolean("isBigImage");
        },
      }),
    });
  },
});

const TournamentMakerDeal = objectType({
  name: "TournamentMakerDeal",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.string("url");
  },
});

const TournamentMakerDealInput = inputObjectType({
  name: "TournamentMakerDealInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.string("url");
  },
});

const TournamentConfig = objectType({
  name: "TournamentConfig",
  definition(t) {
    t.nonNull.boolean("registerationOpen");
    t.nonNull.boolean("projectsSubmissionOpen");
    t.string("ideasRootNostrEventId");
    t.boolean("showFeed");
    t.string("mainFeedHashtag");
    t.list.nonNull.string("feedFilters");
  },
});

const TournamentConfigInput = inputObjectType({
  name: "TournamentConfigInput",
  definition(t) {
    t.nonNull.boolean("registerationOpen");
    t.nonNull.boolean("projectsSubmissionOpen");
    t.string("ideasRootNostrEventId");
    t.boolean("showFeed");
    t.string("mainFeedHashtag");
    t.list.nonNull.string("feedFilters");
  },
});

const TournamentSchedule = objectType({
  name: "TournamentSchedule",
  definition(t) {
    t.nonNull.string("date");
    t.nonNull.list.nonNull.field("events", {
      type: objectType({
        name: "TournamentScheduleEvent",
        definition(t) {
          t.nonNull.string("title");
          t.string("time");
          t.string("timezone");
          t.string("url");
          t.string("type");
          t.string("location");
        },
      }),
    });
  },
});

const TournamentScheduleInput = inputObjectType({
  name: "TournamentScheduleInput",
  definition(t) {
    t.nonNull.string("date");
    t.nonNull.list.nonNull.field("events", {
      type: inputObjectType({
        name: "TournamentScheduleEventInput",
        definition(t) {
          t.nonNull.string("title");
          t.string("time");
          t.string("timezone");
          t.string("url");
          t.string("type");
          t.string("location");
        },
      }),
    });
  },
});

const TournamentParticipant = objectType({
  name: "TournamentParticipant",
  definition(t) {
    t.nonNull.field("hacking_status", {
      type: TournamentMakerHackingStatusEnum,
    });
    t.boolean("is_registered");
    t.nonNull.field("user", { type: "User" });
  },
});

const TournamentEventTypeEnum = enumType({
  name: "TournamentEventTypeEnum",
  members: {
    TwitterSpace: 0,
    Workshop: 1,
    IRLMeetup: 2,
    OnlineMeetup: 3,
  },
});

const TournamentMakerHackingStatusEnum = enumType({
  name: "TournamentMakerHackingStatusEnum",
  members: {
    Solo: 0,
    OpenToConnect: 1,
  },
});

const TournamentEvent = objectType({
  name: "TournamentEvent",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("image", {
      async resolve(parent) {
        return prisma.tournamentEvent
          .findUnique({ where: { id: parent.id } })
          .image_rel()
          .then(resolveImgObjectToUrl);
      },
    });
    t.nonNull.string("description");
    t.nonNull.date("starts_at");
    t.nonNull.date("ends_at");
    t.nonNull.string("location");
    t.nonNull.string("website");
    t.nonNull.field("type", { type: TournamentEventTypeEnum });
    t.nonNull.list.nonNull.string("links", {
      resolve() {
        return [];
      },
    });
  },
});

const Tournament = objectType({
  name: "Tournament",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.string("thumbnail_image", {
      async resolve(parent) {
        return (
          resolveImgObjectToUrl(parent.thumbnail_image_rel) ||
          prisma.tournament
            .findUnique({ where: { id: parent.id } })
            .thumbnail_image_rel()
            .then(resolveImgObjectToUrl)
        );
      },
    });
    t.nonNull.string("cover_image", {
      async resolve(parent) {
        return (
          resolveImgObjectToUrl(parent.cover_image_rel) ||
          prisma.tournament
            .findUnique({ where: { id: parent.id } })
            .cover_image_rel()
            .then(resolveImgObjectToUrl)
        );
      },
    });
    t.nonNull.date("start_date");
    t.nonNull.date("end_date");
    t.nonNull.string("location");
    t.nonNull.string("website");

    t.nonNull.int("events_count", {
      resolve(parent) {
        return prisma.tournamentEvent.count({
          where: {
            tournament_id: parent.id,
          },
        });
      },
    });
    t.nonNull.int("makers_count", {
      resolve(parent) {
        return prisma.tournamentParticipant.count({
          where: {
            tournament_id: parent.id,
          },
        });
      },
    });
    t.nonNull.int("projects_count", {
      resolve(parent) {
        return prisma.tournamentProject.count({
          where: {
            tournament_id: parent.id,
          },
        });
      },
    });

    t.nonNull.list.nonNull.field("tracks", {
      type: TournamentTrack,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .tracks();
      },
    });
    t.nonNull.list.nonNull.field("prizes", {
      type: TournamentPrize,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .then((t) => t.prizes || []);
      },
    });
    t.nonNull.list.nonNull.field("judges", {
      type: TournamentJudge,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .judges();
      },
    });
    t.nonNull.list.nonNull.field("faqs", {
      type: TournamentFAQ,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .faqs()
          .then((faqs) => [...faqs].sort((faq1, faq2) => faq1.id - faq2.id));
      },
    });
    t.nonNull.list.nonNull.field("events", {
      type: TournamentEvent,
      resolve(parent) {
        return prisma.tournamentEvent.findMany({
          where: {
            tournament_id: parent.id,
          },
          orderBy: {
            starts_at: "asc",
          },
        });
      },
    });

    t.nonNull.list.nonNull.field("contacts", {
      type: TournamentContact,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .then((t) => t.contacts || []);
      },
    });

    t.nonNull.list.nonNull.field("partners", {
      type: TournamentPartner,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .then((t) => t.partners || []);
      },
    });

    t.nonNull.list.nonNull.field("schedule", {
      type: TournamentSchedule,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .then((t) => t.schedule || []);
      },
    });

    t.nonNull.list.nonNull.field("makers_deals", {
      type: TournamentMakerDeal,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .then((t) => t.makers_deals || []);
      },
    });

    t.nonNull.field("config", {
      type: TournamentConfig,
      resolve(parent) {
        return prisma.tournament
          .findUnique({ where: { id: parent.id } })
          .then((t) => t.config || {});
      },
    });
  },
});

const TournamentMakersResponse = objectType({
  name: "TournamentMakersResponse",
  definition(t) {
    t.boolean("hasNext");
    t.boolean("hasPrev");

    t.nonNull.list.nonNull.field("makers", { type: TournamentParticipant });
  },
});

const TournamentProjectsResponse = objectType({
  name: "TournamentProjectsResponse",
  definition(t) {
    t.int("allItemsCount");
    t.boolean("hasNext");
    t.boolean("hasPrev");
    t.nonNull.list.nonNull.field("projects", { type: "Project" });
  },
});

const getTournamentById = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getTournamentById", {
      type: Tournament,
      args: {
        idOrSlug: nonNull(stringArg()),
      },
      resolve(_, { idOrSlug }, ctx, info) {
        let where = {};

        if (isNaN(idOrSlug)) where = { slug: idOrSlug };
        else where = { id: parseInt(idOrSlug) };

        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).value;

        return prisma.tournament
          .findUnique({
            where,
            ...select,
          })
          .catch(console.log);
      },
    });
  },
});

const getTournamentToRegister = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getTournamentToRegister", {
      type: Tournament,
      args: {},
      resolve() {
        return prisma.tournament.findMany({
          where: {
            end_date: {
              gt: new Date(),
            },
          },
        });
      },
    });
  },
});

const ProjectInTournament = objectType({
  name: "ProjectInTournament",
  definition(t) {
    t.field("track", {
      type: TournamentTrack,
    });
    t.nonNull.field("project", {
      type: "Project",
    });
  },
});

const ParticipationInfo = objectType({
  name: "ParticipationInfo",
  definition(t) {
    t.nonNull.date("createdAt");
    t.nonNull.string("email");
    t.nonNull.field("hacking_status", {
      type: TournamentMakerHackingStatusEnum,
    });
    t.nonNull.list.nonNull.field("projects", {
      type: ProjectInTournament,
    });
  },
});

const getUserParticipationInfo = async (user_id, tournament_id) => {
  const [registerationData, projects] = await Promise.all([
    prisma.tournamentParticipant.findUnique({
      where: {
        tournament_id_user_id: {
          tournament_id,
          user_id,
        },
      },
      select: {
        createdAt: true,
        email: true,
        hacking_status: true,
      },
    }),
    prisma.tournamentProject.findMany({
      where: {
        tournament_id,
        project: {
          members: {
            some: {
              userId: user_id,
            },
          },
        },
      },
      include: {
        project: {
          include: {
            thumbnail_image_rel: true,
            category: true,
          },
        },
        track: true,
      },
    }),
  ]);

  return registerationData
    ? {
        ...registerationData,
        projects,
      }
    : null;
};

const tournamentParticipationInfo = extendType({
  type: "Query",
  definition(t) {
    t.field("tournamentParticipationInfo", {
      type: ParticipationInfo,
      args: {
        tournamentId: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        const user = ctx.user;
        if (!user?.id) return null;
        return getUserParticipationInfo(user.id, args.tournamentId);
      },
    });
  },
});

const getMakersInTournament = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getMakersInTournament", {
      type: TournamentMakersResponse,
      args: {
        tournamentIdOrSlug: nonNull(stringArg()),
        ...paginationArgs({ take: 10 }),
        search: stringArg(),
        roleId: intArg(),
        openToConnect: booleanArg(),
      },
      async resolve(_, args, ctx) {
        const user = ctx.user;

        let whereTournament = {};

        if (isNaN(args.tournamentIdOrSlug))
          whereTournament = { slug: args.tournamentIdOrSlug };
        else whereTournament = { id: parseInt(args.tournamentIdOrSlug) };

        let filters = [];

        if (args.search)
          filters.push({
            OR: [
              {
                name: {
                  contains: args.search,
                  mode: "insensitive",
                },
              },
              {
                jobTitle: {
                  contains: args.search,
                  mode: "insensitive",
                },
              },
            ],
          });

        if (args.roleId)
          filters.push({
            roles: {
              some: {
                roleId: args.roleId,
              },
            },
          });

        if (args.openToConnect)
          filters.push({
            OR: [
              {
                github: {
                  not: "",
                },
              },
              {
                twitter: {
                  not: "",
                },
              },
              {
                linkedin: {
                  not: "",
                },
              },
            ],
          });

        if (user?.id)
          filters.push({
            id: {
              not: user.id,
            },
          });

        const makers = (
          await prisma.tournamentParticipant.findMany({
            where: {
              tournament: whereTournament,
              ...(filters.length > 0 && {
                user: {
                  AND: filters,
                },
              }),
              ...(args.openToConnect && {
                hacking_status:
                  TournamentMakerHackingStatusEnum.value.members.OpenToConnect,
              }),
            },
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
            skip: args.skip,
            take: args.take + 1,
          })
        ).map((item) => ({
          hacking_status: item.hacking_status,
          user: item.user,
        }));

        return {
          hasNext: makers.length === args.take + 1,
          hasPrev: args.skip !== 0,
          makers: makers.slice(0, args.take),
        };
      },
    });
  },
});

const pubkeysOfMakersInTournament = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.string("pubkeysOfMakersInTournament", {
      args: {
        tournamentIdOrSlug: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        let whereTournament = {};

        if (isNaN(args.tournamentIdOrSlug))
          whereTournament = { slug: args.tournamentIdOrSlug };
        else whereTournament = { id: parseInt(args.tournamentIdOrSlug) };

        const usersInTournament = await prisma.tournamentParticipant.findMany({
          where: {
            tournament: whereTournament,
          },
          select: {
            user_id: true,
          },
        });

        return prisma.userNostrKey
          .findMany({
            where: {
              user_id: {
                in: usersInTournament.map((u) => u.user_id),
              },
            },
            select: {
              key: true,
            },
          })
          .then((data) => data.map((i) => i.key));
      },
    });
  },
});

const pubkeysOfProjectsInTournament = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.string("pubkeysOfProjectsInTournament", {
      args: {
        tournamentIdOrSlug: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        let whereTournament = {};

        if (isNaN(args.tournamentIdOrSlug))
          whereTournament = { slug: args.tournamentIdOrSlug };
        else whereTournament = { id: parseInt(args.tournamentIdOrSlug) };

        return prisma.tournamentProject
          .findMany({
            where: {
              tournament: whereTournament,
            },
            select: {
              project: {
                select: {
                  npub: true,
                },
              },
            },
          })
          .then((data) =>
            data.map((i) => i.project.npub).filter((i) => i !== null)
          );
      },
    });
  },
});

const getProjectsInTournament = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getProjectsInTournament", {
      type: TournamentProjectsResponse,
      args: {
        tournamentId: nonNull(intArg()),
        ...paginationArgs({ take: 10 }),
        search: stringArg(),
        trackId: intArg(),
        roleId: intArg(),
        lookingForMakers: booleanArg(),
      },
      async resolve(_, args, ctx, info) {
        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).valueOf("projects", "Project", {
          select: {
            _count: {
              select: {
                members: true,
              },
            },
          },
        });
        let filters = [];

        if (args.search)
          filters.push({
            OR: [
              {
                title: {
                  contains: args.search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: args.search,
                  mode: "insensitive",
                },
              },
            ],
          });

        const where = {
          tournament_id: args.tournamentId,
          ...(args.trackId && {
            track_id: args.trackId,
          }),
          ...(filters.length > 0 && {
            project: {
              AND: filters,
            },
          }),
          ...(args.roleId !== null &&
            (args.roleId !== -1
              ? {
                  project: {
                    recruit_roles: {
                      some: {
                        roleId: args.roleId,
                      },
                    },
                  },
                }
              : {
                  NOT: {
                    project: {
                      recruit_roles: {
                        none: {},
                      },
                    },
                  },
                })),
        };

        const [projects, allProjectsCount] = await Promise.all([
          prisma.tournamentProject
            .findMany({
              where,
              include: {
                project: {
                  ...select,
                },
              },
              skip: args.skip,
              take: args.take + 1,
            })
            .then((res) =>
              res.map((item) => ({
                ...item.project,
                members_count: item.project._count.members,
              }))
            ),

          prisma.tournamentProject
            .aggregate({
              where,
              _count: true,
            })
            .then((res) => res._count),
        ]);

        return {
          allItemsCount: allProjectsCount,
          hasNext: projects.length === args.take + 1,
          hasPrev: args.skip !== 0,
          projects: projects.slice(0, args.take),
        };
      },
    });
  },
});

const CreateTournamentInput = inputObjectType({
  name: "CreateTournamentInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("slug");
    t.nonNull.string("description");

    t.nonNull.field("thumbnail_image", {
      type: ImageInput,
    });
    t.nonNull.field("cover_image", {
      type: ImageInput,
    });

    t.nonNull.date("start_date");
    t.nonNull.date("end_date");

    t.nonNull.string("location");
    t.nonNull.string("website");

    t.nonNull.list.nonNull.field("prizes", {
      type: TournamentPrizeInput,
    });

    // contacts
    t.nonNull.list.nonNull.field("contacts", {
      type: TournamentContactInput,
    });
    // partners
    t.nonNull.list.nonNull.field("partners", {
      type: TournamentPartnerInput,
    });
    // schedule
    t.nonNull.list.nonNull.field("schedule", {
      type: TournamentScheduleInput,
    });
    // makers deals
    t.nonNull.list.nonNull.field("makers_deals", {
      type: TournamentMakerDealInput,
    });

    // config
    t.nonNull.field("config", {
      type: TournamentConfigInput,
    });

    // tracks
    t.nonNull.list.nonNull.field("tracks", {
      type: TournamentTrackInput,
    });

    // faqs
    t.nonNull.list.nonNull.field("faqs", {
      type: TournamentFAQInput,
    });

    // judges
    t.nonNull.list.nonNull.field("judges", {
      type: TournamentJudgeInput,
    });
  },
});

const createTournament = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTournament", {
      type: "Tournament",
      args: {
        data: CreateTournamentInput,
      },
      async resolve(_root, { data: input }, ctx) {
        const user = ctx.user;

        if (!user?.id) throw new Error("You have to login");

        const [thumbnail_image_rel, cover_image_rel] = await Promise.all([
          prisma.hostedImage.findFirstOrThrow({
            where: {
              id: Number(input.thumbnail_image.id),
            },
          }),
          prisma.hostedImage.findFirstOrThrow({
            where: {
              id: Number(input.cover_image.id),
            },
          }),
        ]);

        return prisma.tournament.create({
          data: {
            title: input.title,
            slug: input.slug,
            description: input.description,
            location: input.location,
            website: input.website,
            start_date: input.start_date,
            end_date: input.end_date,
            thumbnail_image: "",
            thumbnail_image_rel: {
              connect: {
                id: thumbnail_image_rel.id,
              },
            },
            cover_image: "",
            cover_image_rel: {
              connect: {
                id: cover_image_rel.id,
              },
            },
            prizes: input.prizes,
            contacts: input.contacts,
            partners: input.partners,
            schedule: input.schedule,
            makers_deals: input.makers_deals,
            config: input.config,

            tracks: {
              createMany: {
                data: input.tracks,
              },
            },

            faqs: {
              createMany: {
                data: input.faqs,
              },
            },

            judges: {
              createMany: {
                data: input.judges,
              },
            },
          },
        });
      },
    });
  },
});

const RegisterInTournamentInput = inputObjectType({
  name: "RegisterInTournamentInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.field("hacking_status", {
      type: TournamentMakerHackingStatusEnum,
    });
  },
});

const registerInTournament = extendType({
  type: "Mutation",
  definition(t) {
    t.field("registerInTournament", {
      type: "User",
      args: {
        data: RegisterInTournamentInput,
        tournament_id: nonNull(intArg()),
      },
      async resolve(
        _root,
        { tournament_id, data: { email, hacking_status } },
        ctx
      ) {
        const user = ctx.user;

        // Do some validation
        if (!user?.id) throw new Error("You have to login");

        // Email verification here:
        // ....
        // ....

        const alreadyRegistered = await prisma.tournamentParticipant.findFirst({
          where: {
            tournament_id,
            user_id: user.id,
          },
          include: {
            user: true,
          },
        });

        if (alreadyRegistered) return alreadyRegistered.user;

        return prisma.tournamentParticipant
          .create({
            data: {
              tournament_id,
              user_id: user.id,
              email,
              hacking_status,
            },
            include: {
              user: true,
            },
          })
          .then((data) => data.user);
      },
    });
  },
});

const UpdateTournamentRegistrationInput = inputObjectType({
  name: "UpdateTournamentRegistrationInput",
  definition(t) {
    t.string("email");
    t.field("hacking_status", { type: TournamentMakerHackingStatusEnum });
  },
});

const updateTournamentRegistration = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateTournamentRegistration", {
      type: ParticipationInfo,
      args: {
        data: UpdateTournamentRegistrationInput,
        tournament_id: nonNull(intArg()),
      },
      async resolve(
        _root,
        { tournament_id, data: { email, hacking_status } },
        ctx
      ) {
        const user = ctx.user;

        // Do some validation
        if (!user?.id) throw new Error("You have to login");

        // Email verification here:
        // ....
        // ....

        return prisma.tournamentParticipant.update({
          where: {
            tournament_id_user_id: { tournament_id, user_id: user.id },
          },
          data: removeNulls({
            email,
            hacking_status,
          }),
        });
      },
    });
  },
});

const AddProjectToTournamentInput = inputObjectType({
  name: "AddProjectToTournamentInput",
  definition(t) {
    t.nonNull.int("project_id");
    t.nonNull.int("tournament_id");
    t.nonNull.int("track_id");
  },
});

const addProjectToTournament = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addProjectToTournament", {
      type: ParticipationInfo,
      args: {
        input: AddProjectToTournamentInput,
      },
      async resolve(
        _root,
        { input: { project_id, tournament_id, track_id } },
        ctx
      ) {
        const user = ctx.user;

        // Do some validation
        if (!user?.id) throw new Error("You have to login");

        const isMember = !!(await prisma.projectMember.findUnique({
          where: {
            projectId_userId: {
              projectId: project_id,
              userId: user.id,
            },
          },
        }));

        if (!isMember)
          throw new ApolloError(
            "You can only add a project you are a member in"
          );

        await prisma.tournamentProject.upsert({
          where: {
            tournament_id_project_id: {
              project_id,
              tournament_id,
            },
          },
          create: {
            project_id,
            tournament_id,
            track_id,
          },
          update: {
            track_id,
          },
        });

        const [newParticipationInfo] = await Promise.all([
          getUserParticipationInfo(user.id, tournament_id),
          invalidateTournamentProjects().catch(console.log),
        ]);

        return newParticipationInfo;
      },
    });
  },
});

module.exports = {
  // Types
  Tournament,

  // Enums
  TournamentEventTypeEnum,

  // Queries
  getTournamentById,
  getMakersInTournament,
  pubkeysOfMakersInTournament,
  pubkeysOfProjectsInTournament,
  getProjectsInTournament,
  tournamentParticipationInfo,
  getTournamentToRegister,

  // Mutations
  createTournament,
  registerInTournament,
  updateTournamentRegistration,
  addProjectToTournament,
};
