const { envsafe, str, url, bool } = require("envsafe");
const { getEnvVarRuntime } = require("../helpers");

const ON_NETLIFY = process.env.NETLIFY || getEnvVarRuntime("NETLIFY_DEV");

const env = envsafe(
  {
    NODE_ENV: str({
      devDefault: "development",
      choices: ["development", "staging", "test", "production"],
    }),
    SITE_URL: url({
      default: process.env.URL,
      devDefault: "http://localhost:3000",
    }),
    FUNCTIONS_URL: str({
      default:
        process.env.DEPLOY_PRIME_URL +
        (ON_NETLIFY ? "/.netlify/functions" : "/dev"),
      devDefault:
        (process.env.URL ?? "http://localhost:8888") +
        (ON_NETLIFY ? "/.netlify/functions" : "/dev"),
    }),
    NETLIFY: bool({
      default: !!ON_NETLIFY,
    }),
    JWT_SECRET: str(),
    LNURL_AUTH_HOST: str({
      default: "https://auth.bolt.fun/.netlify/functions/login",
    }),
    CACHE_PURGE_TOKEN: str({
      allowEmpty: true,
      default: "",
    }),

    CLOUDFLARE_IMAGE_ACCOUNT_ID: str(),
    CLOUDFLARE_IMAGE_API_KEY: str(),
    CLOUDFLARE_IMAGE_ACCOUNT_HASH: str(),

    BOLT_FUN_LIGHTNING_ADDRESS: str({
      default: "johns@getalby.com",
    }),
    DISCORD_NOTIFICATIONS_WEBHOOK_URL: str({
      allowEmpty: true,
      default: "",
      devDefault: "",
    }),

    BF_QUEUES_SERVICE_URL: url({
      devDefault: "http://localhost:5000",
    }),
    BF_QUEUES_SERVICE_USERNAME: str(),
    BF_QUEUES_SERVICE_PASS: str(),

    HYGRAPH_WEBHOOKS_SECRET: str({
      default: "",
    }),
  },
  {
    strict: true,
  }
);
module.exports = env;
