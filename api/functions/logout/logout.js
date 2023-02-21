const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");

const logoutHandler = (req, res, next) => {
  res
    .clearCookie("Authorization", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    })
    .clearCookie("Authorization", {
      secure: true,
      httpOnly: true,
      domain: `.bolt.fun`,
    })
    .redirect("/")
    .end();
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
