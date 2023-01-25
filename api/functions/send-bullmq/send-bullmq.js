const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const IORedis = require("ioredis");

const { Queue } = require("bullmq");
const CONSTS = require("../../utils/consts");
const myQueue = new Queue("WelcomeEmailQueue", {
  connection: new IORedis(CONSTS.REDIS_CONNECTION_URL),
});

function addJobs({ id, email }) {
  return myQueue.add(`Nostr Events`, { whatever: 123, name: "HELLO" });
}

const sendBullMQHandler = async (req, res) => {
  await addJobs({ id: 12, email: "Hello" });
  res.status(200).send("OK");
};
let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.get("/send-bullmq", sendBullMQHandler);
} else {
  const router = express.Router();
  router.get("/send-bullmq", sendBullMQHandler);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
