const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const CONSTS = require("../../utils/consts");
const { prisma } = require("../../prisma");

const onJobSuccess = async (req, res) => {
  const base64Token = Buffer.from(
    `${CONSTS.BF_QUEUES_SERVICE_USERNAME}:${CONSTS.BF_QUEUES_SERVICE_PASS}`
  ).toString("base64");
  const authToken = req.headers.authorization?.split(" ")[1];

  if (authToken !== base64Token)
    return res.status(401).send("Unauthorized Access");

  try {
    const type = req.body.type;
    if (type === "create-story-root-event") {
      const { story_id, root_event_id } = req.body;
      if (!story_id || !root_event_id)
        return res
          .status(400)
          .send("story_id or root_event_id are not provided");

      await prisma.story.update({
        where: { id: Number(story_id) },
        data: {
          nostr_event_id: root_event_id,
        },
      });
    } else {
      return res.status(400).send("Unknown job type: ", type);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An unexpected error happened");
  }
  // Exec job type specific logic
  res.status(200).send("OK");
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/on-job-success", onJobSuccess);
} else {
  const router = express.Router();
  router.post("/on-job-success", onJobSuccess);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
