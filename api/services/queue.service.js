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

const queueService = {
  createStoryRootEvent,
  publishProfileVerifiedEvent,
  newUserRegisteredInTournament,
  newProjectSubmittedInTournament,
};

module.exports = { queueService };
