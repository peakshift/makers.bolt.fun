const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const userActionsService = require("../../services/user-actions-tracker-service");

/**
 * NOTE: Currently, the `register-user-action` function is triggering the `processUserActionsQueue` function after
 * creating the user action.
 * The reason is because, currently, the number of actions that happens per day will likely be a lot less than if we were to trigger the function on a schedule as we initally planned.
 */

const processPendingUsersActions = async (req, res) => {
  try {
    await userActionsService.processUserActionsQueue();
    return res
      .status(200)
      .json({ status: "OK", message: "Finished Processing Users Actions" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/process-pending-users-actions", processPendingUsersActions);
} else {
  const router = express.Router();
  router.post("/process-pending-users-actions", processPendingUsersActions);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
