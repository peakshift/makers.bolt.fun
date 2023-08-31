const env = require("../../utils/consts");
const { callQueueApi } = require("./helpers");

const nostrService = {
  createStoryRootEvent: ({
    id,
    title,
    url,
    canonical_url,
    author_name,
    author_nostr_pubkey,
    tags,
  }) => {
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
  },

  publishProfileVerifiedEvent: ({ event }) => {
    return callQueueApi("/add-job/nostr/publish-profile-verification-event", {
      event,
    });
  },
};

module.exports = nostrService;
