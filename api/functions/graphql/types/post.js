const {
  intArg,
  objectType,
  extendType,
  nonNull,
  interfaceType,
  unionType,
  stringArg,
  enumType,
  arg,
  inputObjectType,
} = require("nexus");
const { paginationArgs, defaultPrismaSelectFields } = require("./helpers");
const { prisma } = require("../../../prisma");
const { ApolloError } = require("apollo-server-lambda");
const { marked } = require("marked");
const { resolveImgObjectToUrl } = require("../../../utils/resolveImageUrl");
const { ImageInput } = require("./misc");
const { deleteImages } = require("../../../services/imageUpload.service");
const { logError } = require("../../../utils/logger");
const { PrismaSelect } = require("@paljs/plugins");

const POST_TYPE = enumType({
  name: "POST_TYPE",
  members: ["Story", "Bounty", "Question"],
});

const asType = (type) => (obj) => {
  if (Array.isArray(obj)) return obj.map((o) => ({ ...o, type }));
  return { ...obj, type };
};

const asStoryType = asType("Story");
const asQuestionType = asType("Question");
const asBountyType = asType("Bounty");

const Author = objectType({
  name: "Author",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("avatar", {
      async resolve(parent) {
        if (parent.avatar_rel) {
          return resolveImgObjectToUrl(parent.avatar_rel);
        }
        return prisma.user
          .findUnique({ where: { id: parent.id } })
          .avatar_rel()
          .then(resolveImgObjectToUrl);
      },
    });
    t.nonNull.date("join_date");

    t.string("lightning_address");
  },
});

const PostBase = interfaceType({
  name: "PostBase",
  resolveType(item) {
    return item.type;
  },
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.date("createdAt");
    t.nonNull.date("updatedAt");
    t.nonNull.string("body");
    t.nonNull.string("excerpt");
    t.nonNull.int("votes_count");
    t.boolean("is_published");
  },
});

const Story = objectType({
  name: "Story",
  definition(t) {
    t.implements("PostBase");
    t.nonNull.string("type", {
      resolve: () => t.typeName,
    });
    t.string("cover_image", {
      async resolve(parent) {
        return (
          resolveImgObjectToUrl(parent.cover_image_rel) ||
          prisma.story
            .findUnique({ where: { id: parent.id } })
            .cover_image_rel()
            .then(resolveImgObjectToUrl)
        );
      },
    });
    t.nonNull.list.nonNull.field("comments", {
      type: "PostComment",
      resolve: (parent) => [],
    });
    t.nonNull.list.nonNull.field("tags", {
      type: "Tag",
      resolve: (parent) => {
        return (
          parent.tags ||
          prisma.story.findUnique({ where: { id: parent.id } }).tags()
        );
      },
    });
    t.nonNull.int("comments_count", {
      resolve: async (parent) => {
        const post = await prisma.story.findUnique({
          where: { id: parent.id },
          include: {
            _count: {
              select: {
                comments: true,
              },
            },
          },
        });
        return post._count.comments;
      },
    });
    t.nonNull.field("author", {
      type: "Author",
      resolve: (parent) => {
        return (
          parent.user ||
          prisma.story.findUnique({ where: { id: parent.id } }).user()
        );
      },
    });

    t.field("project", {
      type: "Project",
      resolve: (parent) => {
        return (
          parent.project ||
          prisma.story.findUnique({ where: { id: parent.id } }).project()
        );
      },
    });
  },
});

const StoryInputType = inputObjectType({
  name: "StoryInputType",
  definition(t) {
    t.int("id");
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.field("cover_image", {
      type: ImageInput,
    });
    t.nonNull.list.nonNull.string("tags");
    t.boolean("is_published");
    t.int("project_id");
  },
});

const BountyApplication = objectType({
  name: "BountyApplication",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("date");
    t.nonNull.string("workplan");
    t.nonNull.field("author", {
      type: "Author",
    });
  },
});

const Bounty = objectType({
  name: "Bounty",
  definition(t) {
    t.implements("PostBase");
    t.nonNull.string("type", {
      resolve: () => "Bounty",
    });
    t.string("cover_image");
    t.nonNull.string("deadline");
    t.nonNull.int("reward_amount");
    t.nonNull.int("applicants_count");
    t.nonNull.list.nonNull.field("applications", {
      type: "BountyApplication",
    });
    t.nonNull.field("author", {
      type: "Author",
      resolve: (parent) => {
        return prisma.bounty.findUnique({ where: { id: parent.id } }).user();
      },
    });

    t.nonNull.list.nonNull.field("tags", {
      type: "Tag",
      resolve: (parent) => [],
    });
  },
});

const Question = objectType({
  name: "Question",
  definition(t) {
    t.implements("PostBase");
    t.nonNull.string("type", {
      resolve: () => "Question",
    });

    t.nonNull.list.nonNull.field("tags", {
      type: "Tag",
      resolve: (parent) =>
        prisma.question.findUnique({ where: { id: parent.id } }).tags(),
    });

    // t.nonNull.int('answers_count');
    // t.nonNull.list.nonNull.field('comments', {
    //     type: "PostComment",
    //     resolve: (parent) => {
    //         return prisma.question.findUnique({ where: { id: parent.id } }).comments();
    //     }
    // });

    t.nonNull.field("author", {
      type: "Author",
      resolve: (parent) => {
        return prisma.question.findUnique({ where: { id: parent.id } }).user();
      },
    });
  },
});

const PostComment = objectType({
  name: "PostComment",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.date("created_at");
    t.nonNull.string("body");
    t.nonNull.field("author", {
      type: "Author",
    });
    t.int("parentId");
    t.nonNull.int("votes_count");
  },
});

const Post = unionType({
  name: "Post",
  definition(t) {
    t.members("Story", "Bounty", "Question");
  },
  resolveType: (item) => {
    return item.type;
  },
});

const getFeed = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getFeed", {
      type: "Post",
      args: {
        ...paginationArgs({ take: 10 }),
        sortBy: stringArg(), // all, popular, trending, newest
        tag: intArg({
          default: 0,
        }),
      },
      resolve(_, { take, skip, tag, sortBy }, ctx, info) {
        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).valueWithFilter("Story");

        let orderBy = { createdAt: "desc" };

        if (sortBy === "popular") orderBy = { votes_count: "desc" };
        else if (sortBy === "newest") orderBy = { createdAt: "desc" };

        return prisma.story
          .findMany({
            ...select,
            orderBy: orderBy,
            where: {
              ...(tag && {
                tags: {
                  some: {
                    id: tag,
                  },
                },
              }),
              is_published: true,
            },
            skip,
            take,
          })
          .then(asStoryType);
      },
    });
  },
});

const getTrendingPosts = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getTrendingPosts", {
      type: "Post",
      args: {},
      resolve(root, args, ctx, info) {
        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).valueWithFilter("Story");
        const now = new Date();
        const lastWeekDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        return prisma.story
          .findMany({
            ...select,
            where: {
              createdAt: {
                gte: lastWeekDate,
              },
              is_published: true,
            },
            orderBy: { votes_count: "desc" },
            take: 5,
          })
          .then(asStoryType);
      },
    });
  },
});

const getMyDrafts = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getMyDrafts", {
      type: "Post",
      args: {
        type: arg({
          type: nonNull("POST_TYPE"),
        }),
      },
      async resolve(parent, { type }, ctx) {
        const user = ctx.user;
        // Do some validation
        if (!user?.id) throw new ApolloError("Not Authenticated");

        if (type === "Story")
          return prisma.story
            .findMany({
              where: {
                is_published: false,
                user_id: user.id,
              },
              orderBy: { createdAt: "desc" },
            })
            .then(asStoryType);
        return [];
      },
    });
  },
});

const getPostById = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getPostById", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
        type: arg({
          type: nonNull("POST_TYPE"),
        }),
      },
      resolve(_, { id, type }, ctx, info) {
        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).valueWithFilter("Story");

        if (type === "Story")
          return prisma.story
            .findUnique({
              where: { id },
              ...select,
            })
            .then(asStoryType);

        if (type === "Question")
          return prisma.question
            .findUnique({
              where: { id },
            })
            .then(asQuestionType);
        return null;
      },
    });
  },
});

const getHostedImagesIdsFromBody = async (body, oldBodyImagesIds = []) => {
  const imagesUrls = [];

  const regex = /(?:!\[(.*?)\]\((.*?)\))/g;
  let match;
  while ((match = regex.exec(body))) {
    const [, , value] = match;
    imagesUrls.push(value);
  }

  const hostedImages = await prisma.hostedImage.findMany({
    where: {
      AND: [
        {
          url: {
            in: imagesUrls,
          },
        },
        {
          OR: [
            {
              is_used: false,
            },
            {
              id: { in: oldBodyImagesIds },
            },
          ],
        },
      ],
    },
    select: {
      id: true,
    },
  });

  const idsToDelete = oldBodyImagesIds.filter(
    (imgId) => !hostedImages.some((i) => i.id === imgId)
  );
  return {
    newImages: hostedImages.map((i) => i.id),
    imagesToDelete: idsToDelete,
  };
};

const createStory = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createStory", {
      type: "Story",
      args: { data: StoryInputType },
      async resolve(_root, args, ctx) {
        const { id, title, body, project_id, cover_image, tags, is_published } =
          args.data;
        const user = ctx.user;

        // Do some validation
        if (!user?.id) throw new ApolloError("Not Authenticated");

        let was_published = false;

        // TODO: validate post data

        let coverImage = null;
        let newBodyImagesIds = [];
        let imagesToDelete = [];
        let imagesToSave = [];

        try {
          if (id) {
            const oldPost = await prisma.story.findUnique({
              where: { id },
              select: {
                user_id: true,
                is_published: true,
                body_image_ids: true,
                cover_image_rel: {
                  select: {
                    id: true,
                    provider_image_id: true,
                  },
                },
              },
            });

            if (!oldPost) throw new ApolloError("No post exist for this id");

            was_published = oldPost.is_published;

            if (user.id !== oldPost.user_id)
              throw new ApolloError("Not post author");

            // Body images
            const bodyImagesRes = await getHostedImagesIdsFromBody(
              body,
              oldPost.body_image_ids
            );

            newBodyImagesIds = bodyImagesRes.newImages;
            imagesToDelete = bodyImagesRes.imagesToDelete;

            // Cover images changed
            if (cover_image?.id) {
              if (
                !!oldPost.cover_image_rel &&
                cover_image.id !== oldPost.cover_image_rel.provider_image_id
              )
                imagesToDelete.push(oldPost.cover_image_rel.id);

              // New cover image
              coverImage = cover_image;
            }
          } else {
            // New Story

            const bodyImagesRes = await getHostedImagesIdsFromBody(body);

            newBodyImagesIds = bodyImagesRes.newImages;

            // New story and new cover image
            if (cover_image?.id) coverImage = cover_image;
          }

          let coverImageRel = {};

          if (coverImage?.id) {
            const hostedCoverImg = await prisma.hostedImage.findFirst({
              where: {
                provider_image_id: coverImage.id,
              },
              select: {
                id: true,
              },
            });
            imagesToSave.push(hostedCoverImg.id);
            coverImageRel = {
              cover_image_rel: {
                connect: {
                  id: hostedCoverImg.id,
                },
              },
            };
          }

          // Preprocess & insert
          const htmlBody = marked.parse(body);
          const excerpt = htmlBody
            .replace(/<[^>]+>/g, "")
            .slice(0, 120)
            .replace(/&amp;/g, "&")
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"');
          let createdStory = null;

          if (id) {
            await prisma.story.update({
              where: { id },
              data: {
                tags: {
                  set: [],
                },
              },
            });
            createdStory = await prisma.story
              .update({
                where: { id },
                data: {
                  title,
                  body,
                  cover_image: "",
                  excerpt,
                  is_published: was_published || is_published,
                  createdAt:
                    !was_published && is_published ? new Date() : undefined,
                  project: project_id
                    ? {
                        connect: {
                          id: project_id,
                        },
                      }
                    : {
                        disconnect: true,
                      },
                  tags: {
                    connect: tags.map((tag) => ({
                      title: tag,
                    })),
                  },
                  body_image_ids: newBodyImagesIds,
                  ...coverImageRel,
                },
              })
              .catch((error) => {
                logError(error);
                throw new ApolloError("Unexpected error happened...");
              });
          } else
            createdStory = await prisma.story
              .create({
                data: {
                  title,
                  body,
                  cover_image: "",
                  excerpt,
                  is_published,
                  tags: {
                    connect: tags.map((tag) => ({
                      title: tag,
                    })),
                  },
                  ...(project_id && {
                    project: {
                      connect: {
                        id: project_id,
                      },
                    },
                  }),
                  user: {
                    connect: {
                      id: user.id,
                    },
                  },
                  body_image_ids: newBodyImagesIds,
                  ...coverImageRel,
                },
              })
              .catch((error) => {
                logError(error);
                throw new ApolloError("Unexpected error happened...");
              });

          await prisma.hostedImage.updateMany({
            where: {
              id: {
                in: [...imagesToSave, ...newBodyImagesIds],
              },
            },
            data: {
              is_used: true,
            },
          });

          await deleteImages(imagesToDelete);

          return createdStory;
        } catch (error) {
          logError(error);
          throw new ApolloError("Unexpected error happened...");
        }
      },
    });
  },
});

const deleteStory = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteStory", {
      type: "Story",
      args: { id: nonNull(intArg()) },
      async resolve(_root, args, ctx) {
        const { id } = args;
        const user = ctx.user;
        // Do some validation
        if (!user?.id) throw new ApolloError("Not Authenticated");

        const oldPost = await prisma.story.findFirst({
          where: { id },
          select: {
            user_id: true,
            body_image_ids: true,
            cover_image_id: true,
          },
        });
        if (user.id !== oldPost.user_id)
          throw new ApolloError("Not post author");

        const deletedPost = await prisma.story.delete({
          where: {
            id,
          },
        });

        const imagesToDelete = oldPost.body_image_ids;
        if (oldPost.cover_image_id) imagesToDelete.push(oldPost.cover_image_id);

        await deleteImages(imagesToDelete);

        return deletedPost;
      },
    });
  },
});

module.exports = {
  // Types
  POST_TYPE,
  Author,
  PostBase,
  BountyApplication,
  Bounty,
  Story,
  StoryInputType,
  Question,
  PostComment,
  Post,
  // Queries
  getFeed,
  getPostById,
  getTrendingPosts,
  getMyDrafts,

  // Mutations
  createStory,
  deleteStory,
};
