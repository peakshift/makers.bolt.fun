const { envsafe, port, str } = require("envsafe");

const env = envsafe({
  NODE_ENV: str({
    devDefault: "development",
    choices: ["development", "test", "production"],
  }),
  JWT_SECRET: str(),
  LNURL_AUTH_HOST: str(),
  REDIS_CONNECTION_URL: str(),

  CLOUDFLARE_IMAGE_ACCOUNT_ID: str(),
  CLOUDFLARE_IMAGE_API_KEY: str(),
  CLOUDFLARE_IMAGE_ACCOUNT_HASH: str(),

  BOLT_FUN_LIGHTNING_ADDRESS: str({
    devDefault: "johns@getalby.com",
  }),
  BOLTFUN_NOSTR_PRIVATE_KEY: str(),
  DISCORD_NOTIFICATIONS_WEBHOOK_URL: str(),

  BF_QUEUES_SERVICE_USERNAME: str(),
  BF_QUEUES_SERVICE_PASS: str(),
});

module.exports = env;
