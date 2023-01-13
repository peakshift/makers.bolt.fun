const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const extractUserFromCookie = require("../../utils/extractUserFromCookie");
const { getUserById } = require("../../auth/utils/helperFuncs");
const { verifySignature, validateEvent } = require("../../utils/nostr-tools");
const { prisma } = require("../../prisma");
const {
  sendNewCommentNotification,
} = require("../../services/notifications.service");

const confirmEvent = async (req, res) => {
  try {
    const userPayload = await extractUserFromCookie(
      req.headers.cookie ?? req.headers.Cookie
    );
    const user = await getUserById(userPayload.id);

    if (!user)
      return res
        .status(401)
        .json({ status: "ERROR", reason: "Not Authenticated" });

    const pubkey = user.nostr_pub_key;

    const event = req.body.event;

    if (!validateEvent(event)) return res.status(400).send("Event not valid");

    if (event.pubkey !== pubkey || !(await verifySignature(event)))
      return res.status(400).send("Signature not valid");

    // Extract type & id
    const rTag = event.tags.find((tag) => tag[0] === "r");
    const [host, type, refId] = rTag[1].split(" ");

    if (host !== "boltfun")
      return res.status(400).send("This event wasn't signed by bolt.fun");

    if (type === "Story_comment") {
      // Extract replyTo id
      const eTag = event.tags.find((tag) => tag[0] === "e");
      let parent_comment_id;
      if (eTag) {
        const [parent_nostr_comment_id] = eTag[1].split(" ");
        if (parent_nostr_comment_id)
          parent_comment_id = (
            await prisma.postComment.findFirst({
              where: {
                nostr_id: parent_nostr_comment_id,
              },
            })
          )?.id;
      }

      await Promise.all([
        // Insert comment in database
        prisma.postComment.create({
          data: {
            nostr_id: event.id,
            body: event.content,
            story_id: Number(refId),
            user_id: user.id,
            parent_comment_id,
          },
        }),

        // Send new comment notification
        prisma.story
          .findUnique({
            where: { id: Number(refId) },
            select: { id: true, title: true },
          })
          .then((story) =>
            sendNewCommentNotification({
              storyId: story.id,
              storyTitle: story.title,
              authorName: user.name,
            }).catch()
          ),
      ]);
    }

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/nostr-confirm-event", confirmEvent);
} else {
  const router = express.Router();
  router.post("/nostr-confirm-event", confirmEvent);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
