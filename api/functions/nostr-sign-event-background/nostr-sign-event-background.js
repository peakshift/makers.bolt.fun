const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const extractUserFromCookie = require("../../utils/extractUserFromCookie");
const { getUserById } = require("../../auth/utils/helperFuncs");
const {
  relayInit,
  getPublicKey,
  getEventHash,
  signEvent,
} = require("nostr-tools");
const CONSTS = require("../../utils/consts");
const { toSlug } = require("../../utils/helpers");
require("websocket-polyfill");

// TODO: Clean up to fix the timeout problem

const RELAYS = [
  "wss://nostr-pub.wellorder.net",
  "wss://nostr1.tunnelsats.com",
  "wss://nostr-relay.wlvs.space",
  // "wss://relay.damus.io",
  // "wss://relayer.fiatjaf.com",
  // "wss://nostr-01.bolt.observer",
];

const nostrSignEventHandler = async (req, res) => {
  if (!CONSTS.BOLTFUN_NOSTR_PRIVATE_KEY)
    return res.status(500).send("No NOSTR Private Key found in env variables");

  const connectedRelays = await connectToRelays(RELAYS);
  if (connectedRelays.length === 0)
    return res.status(502).send("Couldn't connect to any Nostr relay.");

  const storyRootEvent = createStoryRootEvent(12, "Story Title");

  try {
    await publishEvent(storyRootEvent, connectedRelays);

    console.log("Event published successfully");
    // Any clean up to the DB here...
  } catch (error) {}

  await closeRelays(connectedRelays);
};

async function connectToRelays(relaysURLs) {
  const relays = relaysURLs.map((url) => relayInit(url));

  const connectedRelays = await Promise.allSettled(
    relays.map(
      (relay) =>
        new Promise(async (resolve, reject) => {
          try {
            await relay.connect();
            relay.on("connect", () => {
              console.log(`connected ${relay.url}`);
              resolve(relay);
            });
            relay.on("error", () => {
              console.log(`failed to connect to ${relay.url}`);
              reject();
            });
          } catch (error) {
            console.log(`failed to connect to ${relay.url}`);
            reject();
          }
        })
    )
  ).then((relays) =>
    relays
      .filter((relay) => relay.status === "fulfilled")
      .map((relay) => relay.value)
  );

  return connectedRelays;
}

function createStoryRootEvent(storyId, storyTitle) {
  const pubKey = getPublicKey(CONSTS.BOLTFUN_NOSTR_PRIVATE_KEY);

  const storyURL = `https://website.com/${toSlug(storyTitle)}-${storyId}`;

  let event = {
    kind: 1,
    pubkey: pubKey,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["r", storyURL],
      ["authorPubkey", "something"],
    ],
    content: `TEST TEST TEST. PLEASE IGNORE. ${storyTitle} 
Read story: ${storyURL}`,
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, CONSTS.BOLTFUN_NOSTR_PRIVATE_KEY);

  return event;
}

async function publishEvent(event, relays) {
  return new Promise(async (resolve, reject) => {
    console.log("publishing...");

    let publishedCount = 0;

    relays.forEach((relay) => {
      try {
        let pub = relay.publish(event);
        pub.on("seen", () => {
          console.log(`event ${event.id.slice(0, 5)}… seen to ${relay.url}.`);
          publishedCount++;
        });
        pub.on("failed", (reason) => {
          console.log(`failed to publish to ${relay.url}: ${reason}`);
        });
      } catch (error) {
        console.log(error);
      }
    });
    setTimeout(() => {
      if (publishedCount !== 0) {
        resolve();
      } else {
        console.log(
          `failed to publish event ${event.id.slice(0, 5)}… to any relay.`
        );
        reject("Failed to publish to any relay");
      }
    }, 3000);
  });
}

function closeRelays(relays) {
  return Promise.all(relays.map((relay) => relay.close()));
}

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/nostr-sign-event-background", nostrSignEventHandler);
} else {
  const router = express.Router();
  router.post("/nostr-sign-event-background", nostrSignEventHandler);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
