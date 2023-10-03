const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { prisma } = require("../../prisma");

const testSomething = async (req, res) => {
  // first, do some validation to make sure the function has been invoked internally

  const authHeader = req.headers.authorization;
  // if (verifyInternalAuthHeader(authHeader) === false) {
  //   return res.status(401).json({ status: "ERROR", message: "Unauthorized" });
  // }

  const {} = req.body;

  const updatedJudgesData = [
    {
      id: 51,
      name: "MTG 2",
      avatar:
        "https://media.graphassets.com/output=format:jpg/STc2CaobT2GeB7pJ9TYz",
      avatar_id: null,
      company: "Peak Shift",
      twitter: "mtg",
      tournament_id: 8,
    },
    // {
    //   id: 52,
    //   name: "Johns",
    //   avatar:
    //     "https://media.graphassets.com/output=format:jpg/DVdqnjkQQZqZhs5L9hd5",
    //   avatar_id: null,
    //   company: "Peak Shift",
    //   twitter: "@johns",
    //   tournament_id: 8,
    // },
  ];

  try {
    await prisma.tournament.update({
      where: {
        slug: "test-tournament",
      },
      data: {
        judges: {
          deleteMany: {},
          createMany: {
            data: updatedJudgesData.map((j) => ({
              name: j.name,
              avatar: j.avatar,
              twitter: j.twitter,
              company: j.company,
            })),
          },
        },
      },
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
