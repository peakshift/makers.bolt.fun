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
const { getCoverImage, randomItems, random } = require("./helpers");
const { tournament: tournamentMock } = require("./data/tournament.seed");

const chance = new Chance();

const prisma = new PrismaClient();

async function purge() {
  await prisma.award.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.project.deleteMany();
  await prisma.category.deleteMany();
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
  // await purge()
  //   await createCategories();
  //   await createTags();
  //   await createProjects();
  //   await createStories();
  //   await createHackathons();
  //   await fillUserKeysTable();
  //   await createRoles();
  //   await createSkills();
  //   await createTournament();
  await migrateOldImages();
  //   await createCapabilities();
  // await createHashtags();
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

async function createCategories() {
  console.log("Creating Categories");
  await prisma.category.createMany({
    data: categories.map((item) => ({
      id: item.id,
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
      id: item.id,
      title: item.title,
      description: item.description,
      isOfficial: item.isOfficial,
      icon: item.icon,
    })),
  });
}

async function createProjects() {
  console.log("Creating Projects");

  for (let i = 0; i < projects.length; i++) {
    const item = projects[i];
    const { tags, ...feilds } = item;
    await prisma.project.create({
      data: {
        ...feilds,
        tags: {
          connect: tags.map((t) => ({
            id: t.id,
          })),
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        screenshots: Array(4).fill(
          "https://via.placeholder.com/1280x729.png?text=Project+Screenshot"
        ),
      },
    });
  }
}

async function createStories() {
  console.log("Creating Stories");

  const user = await prisma.user.findFirst();

  for (let i = 0; i < 15; i++) {
    const randomTags = randomItems(random(2, 5), tags);
    await prisma.story.create({
      data: {
        body: chance.paragraph(),
        excerpt: chance.paragraph({ sentences: 1 }),
        title: chance.sentence({ words: chance.integer({ min: 3, max: 7 }) }),
        cover_image: getCoverImage(),
        is_published: true,
        tags: {
          connect: randomTags.map((t) => ({ id: t.id })),
        },
        user_id: user.id,
        votes_count: Math.floor(random(10, 6600)),
      },
    });
  }
}

async function createHackathons() {
  console.log("Creating Hackathons");

  for (let i = 0; i < hackathons.length; i++) {
    const item = hackathons[i];
    const { tags, ...feilds } = item;
    await prisma.hackathon.create({
      data: {
        ...feilds,
        tags: {
          connect: tags.map((t) => ({
            id: t.id,
          })),
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
