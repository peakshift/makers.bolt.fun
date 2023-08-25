const { MeiliSearch } = require("meilisearch");
const { prisma } = require("../api/prisma");

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_API_KEY,
});

async function main() {
  console.log("Started");
  //   await migrateUsers();

  //   await migrateStories();

  // await migrateProjects();
}
main();

async function migrateUsers() {
  const users = await prisma.user.findMany({
    include: {
      avatar_rel: true,
      skills: true,
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  console.log(`Syncin users... ${users.length} entries found`);
  const usersDataToAdd = users.map((user) => ({
    id: user.id,
    name: user.name,
    joined_at: user.join_date,
    avatar: user.avatar_rel?.url,
    jobTitle: user.job_title,
    bio: user.bio,
    location: user.location,
    lightning_address: user.lightning_address,
    skills: user.skills.map((skill) => ({
      title: skill.title,
    })),
    roles: user.roles.map((role) => ({
      title: role.role.title,
      level: role.level,
    })),
  }));

  await client.index("Users").deleteAllDocuments();
  await client.index("Users").addDocuments(usersDataToAdd);
  console.log("Users synced!");
}

async function migrateStories() {
  const stories = await prisma.story.findMany({
    where: {
      is_published: true,
    },
    include: {
      user: {
        include: {
          avatar_rel: true,
        },
      },
      tags: true,
      cover_image_rel: true,
      project: true,
    },
  });

  console.log(`Syncin stories... ${stories.length} entries found`);

  const storiesDataToAdd = stories.map((story) => ({
    id: story.id,
    title: story.title,
    createdAt: story.createdAt,
    author: {
      id: story.user.id,
      name: story.user.name,
      avatar: story.user.avatar_rel?.url,
      join_date: story.user.join_date,
    },
    body: story.body,
    tags: story.tags.map((tag) => ({
      title: tag.title,
    })),
    type: "Story",
    cover_image: story.cover_image_rel?.url,
    project: {
      id: story.project?.id,
      title: story.project?.title,
      hashtag: story.project?.hashtag,
    },
  }));

  await client.index("Stories").deleteAllDocuments();
  await client.index("Stories").addDocuments(storiesDataToAdd);
  console.log("Stories synced!");
}

async function migrateProjects() {
  const projects = await prisma.project.findMany({
    include: {
      cover_image_rel: true,
      thumbnail_image_rel: true,
      category: true,
      tags: true,
    },
  });

  console.log(`Syncin projects... ${projects.length} entries found`);

  const projectsDataToAdd = projects.map((project) => ({
    id: project.id,
    title: project.title,
    tagline: project.tagline,
    description: project.description,
    hashtag: project.hashtag,
    cover_image: project.cover_image_rel?.url,
    thumbnail_image: project.thumbnail_image_rel?.url,
    launch_status: project.launch_status,
    lightning_address: project.lightning_address,
    votes_count: project.votes_count,
    category: {
      icon: project.category.icon,
      title: project.category.title,
    },
    tags: project.tags.map((tag) => ({
      title: tag.title,
    })),
  }));

  await client.index("Projects").deleteAllDocuments();
  await client.index("Projects").addDocuments(projectsDataToAdd);
  console.log("Projects synced!");
}
