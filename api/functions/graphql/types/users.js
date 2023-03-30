const { prisma } = require("../../../prisma");
const {
  objectType,
  extendType,
  intArg,
  nonNull,
  inputObjectType,
  stringArg,
  interfaceType,
  list,
  enumType,
} = require("nexus");
const { getUserById } = require("../../../auth/utils/helperFuncs");
const { removeNulls, defaultPrismaSelectFields } = require("./helpers");
const { ImageInput } = require("./misc");
const { Tournament } = require("./tournament");
const { resolveImgObjectToUrl } = require("../../../utils/resolveImageUrl");
const { deleteImage } = require("../../../services/imageUpload.service");
const { PrismaSelect } = require("@paljs/plugins");
const cacheService = require("../../../services/cache.service");
const {
  verifySignature,
  validateEvent,
} = require("../../../utils/nostr-tools");
const { queueService } = require("../../../services/queue.service");
const { ValidationError, AuthenticationError } = require("apollo-server");

const BaseUser = interfaceType({
  name: "BaseUser",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("avatar", {
      async resolve(parent) {
        if (parent.avatar_rel) return resolveImgObjectToUrl(parent.avatar_rel);
        return prisma.user
          .findUnique({ where: { id: parent.id } })
          .avatar_rel()
          .then(resolveImgObjectToUrl);
      },
    });
    t.nonNull.date("join_date");
    t.string("role");
    t.string("jobTitle");
    t.string("lightning_address");
    t.string("website");
    t.string("twitter");
    t.string("discord");
    t.string("github");
    t.string("linkedin");
    t.string("bio");
    t.string("location");
    t.nonNull.list.nonNull.field("roles", {
      type: MakerRole,
      resolve: async (parent) => {
        const data = await prisma.user.findUnique({
          where: {
            id: parent.id,
          },
          select: {
            roles: {
              select: {
                role: true,
                level: true,
              },
            },
          },
        });
        return data.roles.map((data) => {
          return { ...data.role, level: data.level };
        });
      },
    });
    t.nonNull.list.nonNull.field("skills", {
      type: MakerSkill,
      resolve: (parent) => {
        return prisma.user.findUnique({ where: { id: parent.id } }).skills();
      },
    });

    t.nonNull.boolean("is_in_founders_club", {
      resolve: (parent) => {
        return prisma.user
          .findUnique({ where: { id: parent.id } })
          .founders_club_membership()
          .then((res) => !!res);
      },
    });
    t.nonNull.list.nonNull.field("tournaments", {
      type: Tournament,
      resolve: async (parent) => {
        return prisma.tournamentParticipant
          .findMany({
            where: {
              user_id: parent.id,
            },
            include: {
              tournament: true,
            },
          })
          .then((d) => d.map((item) => item.tournament));
      },
    });
    t.nonNull.list.nonNull.field("projects", {
      type: "Project",
      resolve: async (parent) => {
        return prisma.projectMember
          .findMany({
            where: {
              userId: parent.id,
            },
            include: {
              project: true,
            },
          })
          .then((d) => d.map((item) => item.project));
      },
    });
    t.nonNull.list.nonNull.field("similar_makers", {
      type: "User",
      resolve(parent) {
        return prisma.user.findMany({
          where: {
            AND: {
              id: {
                not: parent.id,
              },
            },
          },
          take: 3,
        });
      },
    });

    t.nonNull.list.nonNull.field("stories", {
      type: "Story",
      resolve: (parent) => {
        return prisma.story.findMany({
          where: { user_id: parent.id, is_published: true },
          orderBy: { createdAt: "desc" },
        });
      },
    });

    t.nonNull.boolean("in_tournament", {
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args) {
        return prisma.tournamentParticipant
          .findFirst({ where: { tournament_id: args.id, user_id: parent.id } })
          .then((res) => !!res);
      },
    });

    t.nonNull.list.nonNull.field("nostr_keys", {
      type: "NostrKey",
      resolve: (parent) => {
        return prisma.userNostrKey.findMany({
          where: {
            user_id: parent.id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      },
    });
  },
  resolveType() {
    return null;
  },
});

const RoleLevelEnum = enumType({
  name: "RoleLevelEnum",
  members: {
    Beginner: 0,
    Hobbyist: 1,
    Intermediate: 2,
    Advanced: 3,
    Pro: 4,
  },
});

const GenericMakerRole = objectType({
  name: "GenericMakerRole",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("icon");
  },
});

const MakerRole = objectType({
  name: "MakerRole",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("icon");
    t.nonNull.field("level", { type: RoleLevelEnum });
  },
});

const getAllMakersRoles = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllMakersRoles", {
      type: GenericMakerRole,
      async resolve(parent, args, context) {
        return prisma.workRole.findMany();
      },
    });
  },
});

const MakerSkill = objectType({
  name: "MakerSkill",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
  },
});

const getAllMakersSkills = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllMakersSkills", {
      type: MakerSkill,
      async resolve(parent, args, context) {
        return prisma.skill.findMany();
      },
    });
  },
});

const User = objectType({
  name: "User",
  definition(t) {
    t.implements("BaseUser");
    t.nonNull.field("private_data", {
      type: UserPrivateData,
      resolve: (parent, _, context) => {
        const userId = context.user?.id;

        if (userId !== parent.id)
          throw new Error("Can't access private data for another user");

        return prisma.user.findUnique({
          where: {
            id: parent.id,
          },
          select: {
            id: true,
            email: true,
            nostr_prv_key: true,
            nostr_pub_key: true,
          },
        });
      },
    });
  },
});

const UserPrivateData = objectType({
  name: "UserPrivateData",
  definition(t) {
    t.nonNull.int("id");
    t.string("email");
    t.string("nostr_prv_key");
    t.string("nostr_pub_key");

    t.nonNull.list.nonNull.field("walletsKeys", {
      type: "WalletKey",
      resolve: (parent, _, context) => {
        return prisma.userKey
          .findMany({
            where: {
              user_id: parent.id,
            },
            orderBy: {
              createdAt: "asc",
            },
          })
          .then((keys) =>
            keys.map((k) => ({
              ...k,
              is_current: k.key === context.user.pubKey,
            }))
          );
      },
    });
  },
});

const me = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      async resolve(parent, args, context, info) {
        if (!context.user?.id) return null;
        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).valueWithFilter("User");
        return prisma.user.findUnique({
          ...select,
          where: {
            id: context.user.id,
          },
        });
      },
    });
  },
});

const profile = extendType({
  type: "Query",
  definition(t) {
    t.field("profile", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent, { id }) {
        return prisma.user.findUnique({ where: { id } });
      },
    });
  },
});

const searchUsers = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("searchUsers", {
      type: "User",
      args: {
        value: nonNull(stringArg()),
      },
      async resolve(_, { value }) {
        return prisma.user.findMany({
          where: {
            name: {
              contains: value,
              mode: "insensitive",
            },
          },
        });
      },
    });
  },
});

const similarMakers = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("similarMakers", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent, { id }, ctx) {
        return prisma.user.findMany({
          where: {
            AND: {
              id: {
                not: id,
              },
            },
          },
          take: 3,
        });
      },
    });
  },
});

const NostrKeyWithUser = objectType({
  name: "NostrKeyWithUser",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.field("user", {
      type: User,
    });
  },
});

const usersByNostrKeys = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("usersByNostrKeys", {
      type: NostrKeyWithUser,
      args: {
        keys: nonNull(list(nonNull(stringArg()))),
      },
      async resolve(parent, { keys }, ctx) {
        return prisma.userNostrKey
          .findMany({
            where: {
              key: {
                in: keys,
              },
            },
            include: {
              user: {
                include: {
                  avatar_rel: true,
                },
              },
            },
          })
          .then((data) =>
            data.map((item) => ({ key: item.key, user: item.user }))
          );
      },
    });
  },
});

const ProfileDetailsInput = inputObjectType({
  name: "ProfileDetailsInput",
  definition(t) {
    t.string("name");
    t.field("avatar", {
      type: ImageInput,
    });
    t.string("email");
    t.string("jobTitle");
    t.string("lightning_address");
    t.string("website");
    t.string("twitter");
    t.string("discord");
    t.string("github");
    t.string("linkedin");
    t.string("bio");
    t.string("location");
  },
});

const updateProfileDetails = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateProfileDetails", {
      type: "User",
      args: { data: ProfileDetailsInput },
      async resolve(_root, args, ctx) {
        const user = await getUserById(ctx.user?.id);

        // Do some validation
        if (!user?.id) throw new Error("You have to login");
        // TODO: validate new data

        // ----------------
        // Check if the user uploaded a new image, and if so,
        // remove the old one from the hosting service, then replace it with this one
        // ----------------
        let avatarId = user.avatar_id;
        if (args.data.avatar.id) {
          const newAvatarProviderId = args.data.avatar.id;
          const newAvatar = await prisma.hostedImage.findFirst({
            where: {
              provider_image_id: newAvatarProviderId,
            },
          });

          if (newAvatar && newAvatar.id !== user.avatar_id) {
            avatarId = newAvatar.id;

            await prisma.hostedImage.update({
              where: {
                id: newAvatar.id,
              },
              data: {
                is_used: true,
              },
            });

            await deleteImage(user.avatar_id);
          }
        }

        // Preprocess & insert
        return prisma.user.update({
          where: {
            id: user.id,
          },
          data: removeNulls({
            ...args.data,
            avatar_id: avatarId,

            //hack to remove avatar from args.data
            // can be removed later with a schema data validator
            avatar: "",
          }),
        });
      },
    });
  },
});

const NostrEvent = inputObjectType({
  name: "NostrEventInput",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.int("kind");
    t.nonNull.string("pubkey");
    t.nonNull.string("content");
    t.nonNull.int("created_at");
    t.nonNull.list.nonNull.list.nonNull.string("tags");
    t.nonNull.string("sig");
  },
});

const linkNostrKey = extendType({
  type: "Mutation",
  definition(t) {
    t.field("linkNostrKey", {
      type: "User",
      args: { event: NostrEvent },
      async resolve(_root, args, ctx) {
        const { event } = args;
        const user = await getUserById(ctx.user?.id);

        if (!user?.id) throw new Error("You have to login");

        if (!validateEvent(event)) throw new Error("Invalid event sent");

        const signatureValid = await verifySignature(event);
        if (!signatureValid) throw new Error("Signature not valid");

        const VALID_CONTENT_REGEX =
          /My Maker Profile: https:\/\/makers.bolt.fun\/profile\/(?<id>\d+)/;

        const extractedId = VALID_CONTENT_REGEX.exec(event.content).groups?.id;

        if (!extractedId || Number(extractedId) !== user.id)
          throw new Error("Content of verification message invalid");

        const label = event.tags.find((tag) => tag[0] === "label")?.[1];

        await prisma.userNostrKey.upsert({
          create: {
            key: event.pubkey,
            user_id: user.id,
            label,
          },
          update: {
            user_id: user.id,
            label,
            createdAt: new Date(),
          },
          where: {
            key: event.pubkey,
          },
        });

        await Promise.allSettled([
          queueService.publishProfileVerifiedEvent({ event }),
        ]);

        return prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            userNostrKeys: true,
          },
        });
      },
    });
  },
});

const unlinkNostrKey = extendType({
  type: "Mutation",
  definition(t) {
    t.field("unlinkNostrKey", {
      type: "User",
      args: { key: nonNull(stringArg()) },
      async resolve(_root, args, ctx) {
        const { key } = args;
        const user = await getUserById(ctx.user?.id);

        // Do some validation
        if (!user?.id) throw new Error("You have to login");
        // TODO: validate new data

        const keyExist = await prisma.userNostrKey.findFirst({
          where: {
            user_id: user.id,
            key,
          },
        });

        if (!keyExist) throw new Error("This user doesn't have this key");

        await prisma.userNostrKey.delete({
          where: {
            key,
          },
        });

        return prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            userNostrKeys: true,
          },
        });
      },
    });
  },
});

const WalletKey = objectType({
  name: "WalletKey",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.string("name");
    t.nonNull.date("createdAt");
    t.nonNull.boolean("is_current");
  },
});

const NostrKey = objectType({
  name: "NostrKey",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.string("label");
    t.nonNull.date("createdAt");
  },
});

const UserKeyInputType = inputObjectType({
  name: "UserKeyInputType",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.string("name");
  },
});

const updateUserPreferences = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateUserPreferences", {
      type: "User",
      args: { userKeys: list(nonNull(UserKeyInputType)) },
      async resolve(_root, args, ctx) {
        const user = ctx.user;
        if (!user?.id) throw new Error("You have to login");

        //Update the userkeys
        //--------------------

        // Check if all the sent keys belong to the user
        const userKeys = (
          await prisma.userKey.findMany({
            where: {
              AND: {
                user_id: {
                  equals: user.id,
                },
                key: {
                  in: args.userKeys.map((i) => i.key),
                },
              },
            },
            select: {
              key: true,
            },
          })
        ).map((i) => i.key);

        const newKeys = [];
        for (let i = 0; i < args.userKeys.length; i++) {
          const item = args.userKeys[i];
          if (userKeys.includes(item.key)) newKeys.push(item);
        }

        if (newKeys.length === 0)
          throw new Error("You can't delete all your wallets keys");

        await prisma.userKey.deleteMany({
          where: {
            user_id: user.id,
          },
        });

        await prisma.userKey.createMany({
          data: newKeys.map((i) => ({
            user_id: user.id,
            key: i.key,
            name: i.name,
          })),
        });

        return prisma.user.findUnique({ where: { id: user.id } });
      },
    });
  },
});

const MakerRoleInput = inputObjectType({
  name: "MakerRoleInput",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("level", { type: RoleLevelEnum });
  },
});

const MakerSkillInput = inputObjectType({
  name: "MakerSkillInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

const ProfileRolesInput = inputObjectType({
  name: "ProfileRolesInput",
  definition(t) {
    t.nonNull.list.nonNull.field("roles", {
      type: MakerRoleInput,
    });
    t.nonNull.list.nonNull.field("skills", {
      type: MakerSkillInput,
    });
  },
});

const updateProfileRoles = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateProfileRoles", {
      type: "User",
      args: { data: ProfileRolesInput },
      async resolve(_root, args, ctx) {
        const user = ctx.user;

        // Do some validation
        if (!user?.id) throw new Error("You have to login");

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            skills: {
              set: [],
            },
            roles: {
              deleteMany: {},
            },
          },
        });

        return prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            skills: {
              connect: args.data.skills,
            },
            roles: {
              create: args.data.roles.map((r) => ({
                roleId: r.id,
                level: r.level,
              })),
            },
          },
        });
      },
    });
  },
});

const ClubInvitationStatus = enumType({
  name: "CLUB_INVITATION_STATUS",
  members: {
    INVALID: "INVALID",
    UNUSED: "UNUSED",
    ACCEPTED: "ACCEPTED",
    DECLINED: "DECLINED",
  },
});

const isClubInvitationValid = extendType({
  type: "Query",
  definition(t) {
    t.field("isClubInvitationValid", {
      type: ClubInvitationStatus,
      args: {
        invitationCode: stringArg(),
      },
      async resolve(parent, { invitationCode }, context, info) {
        if (!invitationCode) return null;
        return prisma.foundersClubInvitation
          .findUnique({
            where: {
              code: invitationCode,
            },
          })
          .then((res) =>
            res ? res.status : ClubInvitationStatus.value.members["INVALID"]
          );
      },
    });
  },
});

const acceptOrRejectClubInvitationInput = inputObjectType({
  name: "acceptOrRejectClubInvitationInput",
  definition(t) {
    t.nonNull.string("code");
    t.nonNull.boolean("isAccepted");
    t.string("email");
  },
});

const acceptOrRejectClubInvitation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("acceptOrRejectClubInvitation", {
      type: "User",
      args: { data: acceptOrRejectClubInvitationInput },
      async resolve(_root, { data: { code, isAccepted, email } }, ctx, info) {
        const user = await getUserById(ctx.user?.id);

        if (!user?.id) throw new AuthenticationError("You have to login");

        const invitation = await prisma.foundersClubInvitation.findUnique({
          where: {
            code,
          },
          select: {
            status: true,
          },
        });

        if (!invitation) throw new ValidationError("Invalid invitation code");
        if (invitation.status !== "UNUSED")
          throw new ValidationError("Invitation has already been used");

        const isAlreadyMember = await prisma.foundersClubMember.findUnique({
          where: {
            user_id: user.id,
          },
        });

        if (isAlreadyMember)
          throw new ValidationError(
            "You are already a member of the Founders Club!"
          );

        await prisma.$transaction([
          prisma.foundersClubInvitation.update({
            where: {
              code,
            },
            data: {
              status: isAccepted ? "ACCEPTED" : "DECLINED",
            },
          }),
          prisma.foundersClubMember.create({
            data: {
              user_id: user.id,
              email,
            },
          }),
        ]);

        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).valueWithFilter("User");

        return prisma.user.findUnique({
          where: {
            id: user.id,
          },
          ...select,
        });
      },
    });
  },
});

const applyToFoundersClubInput = inputObjectType({
  name: "applyToFoundersClubInput",
  definition(t) {
    t.nonNull.int("project_id");
    t.nonNull.string("reason");
  },
});

const applyToFoundersClub = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("applyToFoundersClub", {
      type: "String",
      args: { data: applyToFoundersClubInput },
      async resolve(_root, { data: { project_id, reason } }, ctx) {
        const user = await getUserById(ctx.user?.id);

        // Do some validation
        if (!user?.id) throw new AuthenticationError("You have to login");
        const project = await prisma.project.findUnique({
          where: {
            id: project_id,
          },
          select: {
            id: true,
            title: true,
            hashtag: true,
            members: {
              select: {
                user: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        });

        if (!project) throw new ValidationError("Invalid project");

        if (!project.members.find((m) => m.user.id === user.id))
          throw new ValidationError("You are not a member of this project");

        // sendInvitationEmail(user.email, project.title, project.hashtag, reason);

        return "Success";
      },
    });
  },
});

module.exports = {
  // Types

  BaseUser,
  User,
  WalletKey,
  NostrKey,
  MakerRole,
  // Queries
  me,
  profile,
  searchUsers,
  similarMakers,
  getAllMakersRoles,
  getAllMakersSkills,
  usersByNostrKeys,
  isClubInvitationValid,
  // Mutations
  updateProfileDetails,
  updateUserPreferences,
  updateProfileRoles,
  linkNostrKey,
  unlinkNostrKey,
  acceptOrRejectClubInvitation,
  applyToFoundersClub,
};
