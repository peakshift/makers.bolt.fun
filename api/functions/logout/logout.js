const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { getCookieConfig } = require("../is-logged-in/is-logged-in");

const logoutHandler = (req, res, next) => {
  const cookieConfig = getCookieConfig();
  delete cookieConfig.maxAge;
  res.clearCookie("Authorization", cookieConfig).sendStatus(200).end();
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.get("/logout", logoutHandler);
} else {
  const router = express.Router();
  router.get("/logout", logoutHandler);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
