const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const CONSTS = require("../../utils/consts");
const { prisma } = require("../../prisma");
const cacheService = require("../../services/cache.service");

const onQueueCallback = async (req, res) => {
  const base64Token = Buffer.from(
    `${CONSTS.BF_QUEUES_SERVICE_USERNAME}:${CONSTS.BF_QUEUES_SERVICE_PASS}`
  ).toString("base64");
  const authToken = req.headers.authorization?.split(" ")[1];

  if (authToken !== base64Token)
    return res.status(401).send("Unauthorized Access");

  const type = req.body.type;

  const handler = jobHandlers[type];

  if (!handler) return res.status(400).send("Unknown job type: ", type);

  try {
    await handler(req.body);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(error.message ?? "An unexpected error happened");
  }

  // Exec job type specific logic
  return res.status(200).send("OK");
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/on-queue-callback", onQueueCallback);
} else {
  const router = express.Router();
  router.post("/on-queue-callback", onQueueCallback);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};

const jobHandlers = {
  "create-story-root-event": async (data) => {
    const { story_id, root_event_id } = data;
    if (!story_id || !root_event_id)
      throw new Error("story_id or root_event_id are not provided");

    await Promise.all([
      prisma.story.update({
        where: { id: Number(story_id) },
        data: {
          nostr_event_id: root_event_id,
        },
      }),
      cacheService.invalidateStoryById(story_id),
    ]);
  },

  "generate-story-og-summary": async (data) => {
    const { story_id, summary } = data;
    if (!story_id || !summary)
      throw new Error("story_id or summary are not provided");

    await Promise.all([
      prisma.story.update({
        where: { id: Number(story_id) },
        data: {
          excerpt: summary,
        },
      }),
      cacheService.invalidateStoryById(story_id),
    ]);
  },
};
