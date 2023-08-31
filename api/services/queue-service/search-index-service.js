const { callQueueApi } = require("./helpers");

const searchIndexService = {
  createStory: (story) => {
    const { id } = story;
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "story",
      action: "create",
      data: { id },
    });
  },
  updateStory: (story) => {
    const { id } = story;
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "story",
      action: "update",
      data: { id },
    });
  },
  deleteStory: (storyId) => {
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "story",
      action: "delete",
      data: { id: storyId },
    });
  },

  createProject: (project) => {
    const { id } = project;
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "project",
      action: "create",
      data: { id },
    });
  },
  updateProject: (project) => {
    const { id } = project;
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "project",
      action: "update",
      data: { id },
    });
  },
  deleteProject: (projectId) => {
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "project",
      action: "delete",
      data: { id: projectId },
    });
  },

  createUser: (user) => {
    const { id } = user;
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "user",
      action: "create",
      data: { id },
    });
  },
  updateUser: (user) => {
    const { id } = user;
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "user",
      action: "update",
      data: { id },
    });
  },
  deleteUser: (userId) => {
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "user",
      action: "delete",
      data: { id: userId },
    });
  },
};

module.exports = searchIndexService;
