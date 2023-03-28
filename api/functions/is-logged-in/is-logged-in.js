const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const jose = require("jose");
const { JWT_SECRET } = require("../../utils/consts");
const lnurlAuthService = require("../../auth/services/lnurlAuth.service");
const env = require("../../utils/consts");

const isLoggedInHandler = async (req, res) => {
  try {
    const login_session = req.headers.session_token;
    if (login_session) {
      const { payload } = await jose.jwtVerify(
        login_session,
        Buffer.from(JWT_SECRET),
        {
          algorithms: ["HS256"],
        }
      );
      const hash = payload.hash;
      const authToken = await lnurlAuthService.getAuthTokenByHash(hash);

      if (!authToken) return res.json({ logged_in: false });

      Promise.allSettled([
        lnurlAuthService.removeHash(hash),
        lnurlAuthService.removeExpiredHashes(),
      ]);

      const cookieConfig = env.FUNCTIONS_URL.startsWith(
        "https://master--makers-bolt-fun.netlify.app"
      )
        ? {
            maxAge: 3600000 * 24 * 30,
            secure: true,
            httpOnly: true,
            domain: `.bolt.fun`,
          }
        : {
            maxAge: 3600000 * 24 * 30,
            secure: true,
            httpOnly: true,
            sameSite: "none",
          };
      return res
        .status(200)
        .set("Cache-Control", "no-store")
        .cookie("Authorization", authToken, cookieConfig)
        .json({ logged_in: true });
    } else {
      return res.json({
        logged_in: false,
      });
    }
  } catch (error) {
    return res.json({
      logged_in: false,
    });
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.get("/is-logged-in", isLoggedInHandler);
} else {
  const router = express.Router();
  router.get("/is-logged-in", isLoggedInHandler);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};

function getCookieConfig() {
  if (
    env.NODE_ENV === "development" ||
    !env.FUNCTIONS_URL.startsWith("https://master--makers-bolt-fun.netlify.app")
  )
    return {
      maxAge: 3600000 * 24 * 30,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };

  return {
    maxAge: 3600000 * 24 * 30,
    secure: true,
    httpOnly: true,
    domain: `.bolt.fun`,
  };
}

exports.getCookieConfig = getCookieConfig;
