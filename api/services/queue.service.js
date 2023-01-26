const { default: axios } = require("axios");
const env = require("../utils/consts");

const thisServiceApiBase = `${env.FUNCTIONS_URL}${
  env.ON_NETLIFY ? "/.netlify/functions" : "/dev"
}`;

function createStoryRootEvent({ id, title, url }) {
  return axios.post(
    env.BF_QUEUES_SERVICE_URL + "/add-job/publish-story-to-nostr",
    {
      story: { id, title, url },
      callback_url: thisServiceApiBase + "/on-job-success",
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

const queueService = { createStoryRootEvent };

module.exports = { queueService };
