const { PrismaClient } = require("@prisma/client");
const {
  generatePrivateKey,
  getPublicKey,
} = require("../../api/utils/nostr-tools");
const {
  categories,
  projects,
  tags,
  hackathons,
  roles,
  skills,
  capabilities,
} = require("./data");
const Chance = require("chance");
const { getCoverImage, randomItems, random, randomItem } = require("./helpers");
const { tournament: tournamentMock } = require("./data/tournament.seed");

const chance = new Chance();

const prisma = new PrismaClient();

async function purge() {
  const tablenames =
    await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");
  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
}

async function generateNostrKeys() {
  const allUsers = await prisma.user.findMany({
    where: {
      nostr_prv_key: null,
    },
  });
  for (const user of allUsers) {
    const prvkey = generatePrivateKey();
    const pubkey = getPublicKey(prvkey);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        nostr_prv_key: prvkey,
        nostr_pub_key: pubkey,
      },
    });
  }
}

async function main() {
  // console.log("Purging old data");
  await purge();
  await createUsers();
  await fillUserKeysTable();
  await createCategories();
  await createTags();
  await createProjects();
  await createStories();
  await createHackathons();
  await createRoles();
  await createSkills();
  await createTournament();
  await migrateOldImages();
  await createCapabilities();
}

async function migrateOldImages() {
  console.log("Migrating old images data to HostedImage");

  // Can't use prisma method createMany() for columns like Project.screenshots, because this method doesn't return created IDs.

  /**
   * Project
   **/
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      screenshots: true,
      cover_image: true,
      thumbnail_image: true,
    },
  });
  for (const project of projects) {
    /**
     * Project.screenshots to Project.screenshots_ids
     **/
    let projectScreenshotIds = [];
    for (const screenshot of project.screenshots) {
      let hostedImageId = await _insertInHostedImage(screenshot);
      projectScreenshotIds.push(hostedImageId);
    }
    if (projectScreenshotIds.length > 0) {
      await _updateObjectWithHostedImageId(prisma.project, project.id, {
        screenshots_ids: projectScreenshotIds,
      });
    }

    /**
     * Project.cover_image to Project.cover_image_id
     **/
    if (project.cover_image) {
      let hostedImageId = await _insertInHostedImage(project.cover_image);
      await _updateObjectWithHostedImageId(prisma.project, project.id, {
        cover_image_id: hostedImageId,
      });
    }

    /**
     * Project.thumbnail_image to Project.thumbnail_image_id
     **/
    if (project.cover_image) {
      let hostedImageId = await _insertInHostedImage(project.thumbnail_image);
      await _updateObjectWithHostedImageId(prisma.project, project.id, {
        thumbnail_image_id: hostedImageId,
      });
    }
  }

  /**
   * Category
   **/
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      cover_image: true,
    },
  });
  for (const category of categories) {
    if (category.cover_image) {
      let hostedImageId = await _insertInHostedImage(category.cover_image);
      await _updateObjectWithHostedImageId(prisma.category, category.id, {
        cover_image_id: hostedImageId,
      });
    }
  }

  /**
   * Award
   **/
  const awards = await prisma.award.findMany({
    select: {
      id: true,
      image: true,
    },
  });
  for (const award of awards) {
    if (award.image) {
      let hostedImageId = await _insertInHostedImage(award.image);
      await _updateObjectWithHostedImageId(prisma.award, award.id, {
        image_id: hostedImageId,
      });
    }
  }

  /**
   * Hackaton
   **/
  const hackatons = await prisma.hackathon.findMany({
    select: {
      id: true,
      cover_image: true,
    },
  });
  for (const hackaton of hackatons) {
    if (hackaton.cover_image) {
      let hostedImageId = await _insertInHostedImage(hackaton.cover_image);
      await _updateObjectWithHostedImageId(prisma.hackathon, hackaton.id, {
        cover_image_id: hostedImageId,
      });
    }
  }

  /**
   * Story
   **/
  const stories = await prisma.story.findMany({
    select: {
      id: true,
      cover_image: true,
      body: true,
    },
  });
  for (const story of stories) {
    /**
     * Story.body to Story.body_image_ids
     **/
    let bodyImageIds = [];
    const regex = /(?:!\[(.*?)\]\((.*?)\))/g;
    let match;
    while ((match = regex.exec(story.body))) {
      const [, , value] = match;
      let hostedImageId = await _insertInHostedImage(value);
      bodyImageIds.push(hostedImageId);
    }
    if (bodyImageIds.length > 0) {
      await _updateObjectWithHostedImageId(prisma.story, story.id, {
        body_image_ids: bodyImageIds,
      });
    }

    /**
     * Story.cover_image to Story.cover_image_id
     **/
    if (story.cover_image) {
      let hostedImageId = await _insertInHostedImage(story.cover_image);
      await _updateObjectWithHostedImageId(prisma.story, story.id, {
        cover_image_id: hostedImageId,
      });
    }
  }

  /**
   * User
   **/
  const users = await prisma.user.findMany({
    select: {
      id: true,
      avatar: true,
    },
  });
  for (const user of users) {
    if (user.avatar) {
      let hostedImageId = await _insertInHostedImage(user.avatar);
      await _updateObjectWithHostedImageId(prisma.user, user.id, {
        avatar_id: hostedImageId,
      });
    }
  }

  /**
   * Tournament
   **/
  const tournaments = await prisma.tournament.findMany({
    select: {
      id: true,
      thumbnail_image: true,
      cover_image: true,
    },
  });
  for (const tournament of tournaments) {
    if (tournament.thumbnail_image) {
      let hostedImageId = await _insertInHostedImage(
        tournament.thumbnail_image
      );
      await _updateObjectWithHostedImageId(prisma.tournament, tournament.id, {
        thumbnail_image_id: hostedImageId,
      });
    }
    if (tournament.cover_image) {
      let hostedImageId = await _insertInHostedImage(tournament.cover_image);
      await _updateObjectWithHostedImageId(prisma.tournament, tournament.id, {
        cover_image_id: hostedImageId,
      });
    }
  }

  /**
   * TournamentPrize
   **/
  const tournamentPrizes = await prisma.tournamentPrize.findMany({
    select: {
      id: true,
      image: true,
    },
  });
  for (const tournament of tournamentPrizes) {
    if (tournament.image) {
      let hostedImageId = await _insertInHostedImage(tournament.image);
      await _updateObjectWithHostedImageId(
        prisma.tournamentPrize,
        tournament.id,
        {
          image_id: hostedImageId,
        }
      );
    }
  }

  /**
   * TournamentJudge
   **/
  const tournamentJudges = await prisma.tournamentJudge.findMany({
    select: {
      id: true,
      avatar: true,
    },
  });
  for (const tournament of tournamentJudges) {
    if (tournament.avatar) {
      let hostedImageId = await _insertInHostedImage(tournament.avatar);
      await _updateObjectWithHostedImageId(
        prisma.tournamentJudge,
        tournament.id,
        {
          avatar_id: hostedImageId,
        }
      );
    }
  }
  /**
   * TournamentEvent
   **/
  const tournamentEvents = await prisma.tournamentEvent.findMany({
    select: {
      id: true,
      image: true,
    },
  });
  for (const tournament of tournamentEvents) {
    if (tournament.image) {
      let hostedImageId = await _insertInHostedImage(tournament.image);
      await _updateObjectWithHostedImageId(
        prisma.tournamentEvent,
        tournament.id,
        {
          image_id: hostedImageId,
        }
      );
    }
  }
}

async function _insertInHostedImage(url) {
  const newHostedImage = await prisma.hostedImage.create({
    data: {
      filename: "default.png",
      provider: "external",
      provider_image_id: "",
      url,
      is_used: true,
    },
  });
  return newHostedImage.id;
}
async function _updateObjectWithHostedImageId(prismaObject, objectId, data) {
  await prismaObject.update({
    where: { id: objectId },
    data,
  });
}

async function createUsers() {
  console.log("Creating Users");

  await prisma.user.createMany({
    data: Array(5)
      .fill(0)
      .map((_, idx) => {
        const nostr_prv_key = generatePrivateKey();
        const nostr_pub_key = getPublicKey(nostr_prv_key);

        return {
          name: `User ${idx + 1}`,
          jobTitle: "Software Developer",
          avatar: `https://avatars.dicebear.com/api/bottts/${nostr_pub_key}.svg`,
          nostr_prv_key,
          nostr_pub_key,
          lightning_address: "mtg@getalby.com",
          pubKey: nostr_pub_key,
        };
      }),
  });
}

async function createCategories() {
  console.log("Creating Categories");
  await prisma.category.createMany({
    data: categories.map((item) => ({
      title: item.title,
      cover_image:
        "https://via.placeholder.com/1920x850.png?text=Category+Cover+Image",
      icon: "🎭",
    })),
  });
}

async function createTags() {
  console.log("Creating Tags");
  await prisma.tag.createMany({
    data: tags.map((item) => ({
      title: item.title,
      description: item.description,
      long_description: item.description,
      isOfficial: item.isOfficial,
      icon: item.icon,
    })),
  });
}

async function createProjects() {
  console.log("Creating Projects");

  const categories = await prisma.category.findMany({ select: { id: true } });
  const capabilities = await prisma.capability.findMany({
    select: { id: true },
  });
  const tags = await prisma.tag.findMany({ select: { id: true } });
  const users = await prisma.user.findMany({ select: { id: true } });

  for (let i = 0; i < projects.length; i++) {
    const item = projects[i];

    const category_id = randomItem(categories).id;
    const tags_ids = randomItems(random(2, 4), tags);
    const users_ids = randomItems(random(2, 4), users);
    const caps_ids = randomItems(random(3, 5), capabilities);

    await prisma.project.create({
      data: {
        title: item.title,
        hashtag: item.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "_")
          .replace(/^-+|-+$/g, ""),
        website: item.website,
        cover_image: item.cover_image,
        thumbnail_image: item.thumbnail_image,
        votes_count: item.votes_count,
        lightning_address: item.lightning_address,
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        screenshots: Array(4).fill(
          "https://via.placeholder.com/1280x729.png?text=Project+Screenshot"
        ),
        tagline: "Lorem ipsum sortel",
        category_id,
        tags: {
          connect: tags_ids,
        },
        members: {
          create: users_ids.map(({ id }, idx) => ({
            userId: id,
            role: idx === 0 ? "Admin" : "Maker",
          })),
        },
        capabilities: {
          connect: caps_ids,
        },
      },
    });
  }
}

async function createStories() {
  console.log("Creating Stories");

  const users = await prisma.user.findMany({ select: { id: true } });
  const tags = await prisma.tag.findMany({ select: { id: true } });

  for (let i = 0; i < 15; i++) {
    const tags_ids = randomItems(random(2, 4), tags);
    await prisma.story.create({
      data: {
        body: chance.paragraph(),
        excerpt: chance.paragraph({ sentences: 1 }),
        title: chance.sentence({ words: chance.integer({ min: 3, max: 7 }) }),
        cover_image: getCoverImage(),
        is_published: true,
        votes_count: Math.floor(random(10, 6600)),
        tags: {
          connect: tags_ids,
        },
        user: {
          connect: {
            id: randomItem(users).id,
          },
        },
      },
    });
  }
}

async function createHackathons() {
  console.log("Creating Hackathons");

  const tags = await prisma.tag.findMany({ select: { id: true } });

  for (let i = 0; i < hackathons.length; i++) {
    const item = hackathons[i];
    const tags_ids = randomItems(random(2, 4), tags);
    await prisma.hackathon.create({
      data: {
        ...item,
        tags: {
          connect: tags_ids,
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
    });
  }
}

async function fillUserKeysTable() {
  console.log("Filling Users Keys Table");
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      pubKey: true,
    },
  });

  await prisma.userKey.createMany({
    data: allUsers
      .filter((u) => !!u.pubKey)
      .map((u) => ({
        key: u.pubKey,
        user_id: u.id,
      })),
  });
}

async function createRoles() {
  console.log("Creating Users Roles");
  await prisma.workRole.createMany({
    data: roles.map((item) => ({
      id: item.id,
      title: item.title,
      icon: item.icon,
    })),
  });
}

async function createSkills() {
  console.log("Creating Users Skills");
  await prisma.skill.createMany({
    data: skills.map((item) => ({
      id: item.id,
      title: item.title,
    })),
  });
}

async function createTournament() {
  console.log("Creating Tournament");

  const createdTournament = await prisma.tournament.create({
    data: {
      title: tournamentMock.title,
      description: tournamentMock.description,
      start_date: tournamentMock.start_date,
      end_date: tournamentMock.end_date,
      thumbnail_image: tournamentMock.thumbnail_image,
      cover_image: tournamentMock.cover_image,
      location: tournamentMock.location,
      website: tournamentMock.website,

      faqs: {
        createMany: {
          data: tournamentMock.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
        },
      },
      prizes: {
        createMany: {
          data: tournamentMock.prizes.map((p) => ({
            title: p.title,
            image: p.image,
            amount: p.amount,
          })),
        },
      },
      judges: {
        createMany: {
          data: tournamentMock.judges.map((j) => ({
            name: j.name,
            company: j.company,
            twitter: j.twitter,
            avatar: j.avatar,
          })),
        },
      },
      events: {
        createMany: {
          data: tournamentMock.events.map((e) => ({
            title: e.title,
            description: e.description,
            starts_at: e.starts_at,
            ends_at: e.ends_at,
            image: e.image,
            location: e.location,
            type: e.type,
            website: e.website,
          })),
        },
      },
    },
  });
}

async function createCapabilities() {
  console.log("Creating Capabilities");
  await prisma.capability.createMany({
    data: capabilities,
  });
}

async function createHashtags() {
  console.log("Creating Hashtags for projects");
  const projects = await prisma.project.findMany({
    select: { title: true, id: true },
  });
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    await prisma.project.update({
      where: { id: project.id },
      data: {
        hashtag: project.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "_")
          .replace(/^-+|-+$/g, ""),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
