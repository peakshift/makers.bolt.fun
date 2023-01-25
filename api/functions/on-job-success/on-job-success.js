const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const CONSTS = require("../../utils/consts");

const onJobSuccess = async (req, res) => {
  const base64Token = Buffer.from(
    `${CONSTS.BF_QUEUES_SERVICE_USERNAME}:${CONSTS.BF_QUEUES_SERVICE_PASS}`
  ).toString("base64");
  const authToken = req.headers.authorization?.split(" ")[1];

  if (authToken !== base64Token)
    return res.status(401).send("Unauthorized Access");

  // Extract Job Type
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
