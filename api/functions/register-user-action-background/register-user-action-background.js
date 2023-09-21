const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { prisma } = require("../../prisma");
const { verifyInternalAuthHeader } = require("../../auth/utils/helperFuncs");

const registerUserAction = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (verifyInternalAuthHeader(authHeader) === false) {
    return res.status(401).json({ status: "ERROR", message: "Unauthorized" });
  }

  const { action } = req.body;

  if (!action || !action.type || !action.payload) {
    return res
      .status(400)
      .json({ status: "ERROR", message: "Invalid request" });
  }

  try {
    let actionType = await prisma.userActionType.findUnique({
      where: {
        name: action.type,
      },
    });
    if (!actionType) {
      actionType = await prisma.userActionType.create({
        data: {
          name: action.type,
        },
      });
    }

    await prisma.userAction.create({
      data: {
        user_id: action.payload.userId,
        actionTypeId: actionType.id,
        actionPayload: action.payload,
      },
    });

    return res
      .status(200)
      .json({ status: "OK", message: "User Action Created" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/register-user-action", registerUserAction);
} else {
  const router = express.Router();
  router.post("/register-user-action", registerUserAction);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
