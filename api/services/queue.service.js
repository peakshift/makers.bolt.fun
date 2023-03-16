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
  return axios.post(
    env.BF_QUEUES_SERVICE_URL + "/add-job/publish-story-to-nostr",
    {
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
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${env.BF_QUEUES_SERVICE_USERNAME}:${env.BF_QUEUES_SERVICE_PASS}`
        ).toString("base64")}`,
      },
    }
  );
}

function publishProfileVerifiedEvent({ event }) {
  return axios.post(
    env.BF_QUEUES_SERVICE_URL +
      "/add-job/publish-profile-verification-to-nostr",
    {
      event,
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${env.BF_QUEUES_SERVICE_USERNAME}:${env.BF_QUEUES_SERVICE_PASS}`
        ).toString("base64")}`,
      },
    }
  );
}

const queueService = { createStoryRootEvent, publishProfileVerifiedEvent };

module.exports = { queueService };
