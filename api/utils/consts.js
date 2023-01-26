const { envsafe, str, url, bool } = require("envsafe");
console.log(process.env);
const env = envsafe(
  {
    NODE_ENV: str({
      devDefault: "development",
      choices: ["development", "test", "production"],
    }),
    WEBSITE_URL: url({
      default: process.env.DEPLOY_PRIME_URL ?? process.env.URL,
      devDefault: "http://localhost:3000",
    }),
    SERVICE_URL: str({
      default: process.env.DEPLOY_PRIME_URL,
      devDefault: process.env.URL ?? "http://localhost:8888",
    }),
    NETLIFY: bool({
      default: false,
      devDefault: process.env.NETLIFY_DEV,
    }),
    JWT_SECRET: str(),
    LNURL_AUTH_HOST: str(),

    CLOUDFLARE_IMAGE_ACCOUNT_ID: str(),
    CLOUDFLARE_IMAGE_API_KEY: str(),
    CLOUDFLARE_IMAGE_ACCOUNT_HASH: str(),

    BOLT_FUN_LIGHTNING_ADDRESS: str({
      devDefault: "johns@getalby.com",
    }),
    DISCORD_NOTIFICATIONS_WEBHOOK_URL: str({
      allowEmpty: true,
      devDefault: "",
    }),

    BF_QUEUES_SERVICE_URL: url({
      devDefault: "http://localhost:5000",
    }),
    BF_QUEUES_SERVICE_USERNAME: str(),
    BF_QUEUES_SERVICE_PASS: str(),
  },
  {
    strict: true,
  }
);
console.log(env);
module.exports = env;
