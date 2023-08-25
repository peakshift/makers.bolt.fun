const { default: axios } = require("axios");
const env = require("../utils/consts");

function createStoryRootEvent({
  id,
  title,
  url,
  canonical_url,
  author_name,
  author_nostr_pubkey,
  tags,
}) {
  return callQueueApi("/add-job/nostr/publish-story-event", {
    story: {
      id,
      title,
      url,
      canonical_url,
      author_name,
      author_nostr_pubkey,
      tags,
    },
    callback_url: env.FUNCTIONS_URL + "/on-job-success",
  });
}

function publishProfileVerifiedEvent({ event }) {
  return callQueueApi("/add-job/nostr/publish-profile-verification-event", {
    event,
  });
}

function newUserRegisteredInTournament({
  user_id,
  user_name,
  tournament_id,
  email,
}) {
  return callQueueApi("/add-job/emails/new-user-registered-in-tournament", {
    user_id,
    user_name,
    tournament_id,
    email,
  });
}

function newProjectSubmittedInTournament({
  user_id,
  project_id,
  tournament_id,
  track_id,
}) {
  return callQueueApi("/add-job/emails/new-project-submitted-to-tournament", {
    user_id,
    project_id,
    tournament_id,
    track_id,
  });
}

function callQueueApi(url, data) {
  return axios.post(env.BF_QUEUES_SERVICE_URL + url, data, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${env.BF_QUEUES_SERVICE_USERNAME}:${env.BF_QUEUES_SERVICE_PASS}`
      ).toString("base64")}`,
    },
  });
}

const searchIndexService = {
  createStory: (story) => {
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "story",
      action: "create",
      data: story,
    });
  },
  updateStory: (story) => {
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "story",
      action: "update",
      data: story,
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
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "project",
      action: "create",
      data: project,
    });
  },
  updateProject: (project) => {
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "project",
      action: "update",
      data: project,
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
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "user",
      action: "create",
      data: user,
    });
  },
  updateUser: (user) => {
    return callQueueApi("/add-job/search/sync-with-search-db", {
      type: "user",
      action: "update",
      data: user,
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

const queueService = {
  createStoryRootEvent,
  publishProfileVerifiedEvent,
  searchIndexService,
};

module.exports = { queueService };
