const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { queueService } = require("../../services/queue-service");

const testSomething = async (req, res) => {
  // first, do some validation to make sure the function has been invoked internally

  const authHeader = req.headers.authorization;
  // if (verifyInternalAuthHeader(authHeader) === false) {
  //   return res.status(401).json({ status: "ERROR", message: "Unauthorized" });
  // }

  const story = req.body;
  try {
    queueService.aiService
      .generateStoryOgSummary({
        id: story.id,
        title: story.title,
        body: story.body,
      })
      .catch((err) => {
        console.log("Error happened while posting to queue service:");
        console.log(err);
      });

    return res.status(200).json({ status: "OK", message: "Done" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/test-something", testSomething);
} else {
  const router = express.Router();
  router.post("/test-something", testSomething);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
