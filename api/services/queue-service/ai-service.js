const { marked } = require("marked");
const env = require("../../utils/consts");
const { callQueueApi } = require("./helpers");

const aiService = {
  generateStoryOgSummary: ({ id, title, body }) => {
    const htmlBody = marked.parse(body);

    const bodyAsText = htmlBody
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"');

    return callQueueApi("/add-job/ai/generate-story-og-summary", {
      story: {
        id,
        title,
        body: bodyAsText,
      },
      callback_url: env.FUNCTIONS_URL + "/on-queue-callback",
    });
  },
};

module.exports = aiService;
