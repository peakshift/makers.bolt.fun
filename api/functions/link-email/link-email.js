const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { prisma } = require("../../prisma");

const extractUserFromCookie = require("../../utils/extractUserFromCookie");

const linkEmail = async (req, res) => {
  const user = await extractUserFromCookie(
    req.headers.cookie ?? req.headers.Cookie
  );

  if (!user)
    return res
      .status(401)
      .json({ status: "ERROR", reason: "Not Authenticated" });

  const { email, otp } = req.body;

  try {
    const otpExist = await prisma.otp.findFirst({
      where: {
        address: email,
        otp: otp,
      },
    });

    if (!otpExist) {
      return res.status(401).json({ status: "ERROR", message: "Invalid OTP" });
    }

    const isExpired = otpExist.expiresAt < new Date();

    if (isExpired) {
      return res
        .status(401)
        .json({ status: "ERROR", message: "OTP Expired. Request New One." });
    }

    await Promise.all([
      prisma.otp.delete({
        where: {
          id: otpExist.id,
        },
      }),
      prisma.userEmail.upsert({
        where: {
          email,
        },
        create: {
          email,
          user_id: user.id,
        },
        update: {
          email,
          user_id: user.id,
        },
      }),
    ]);

    return res.status(200).json({ status: "OK" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/link-email", linkEmail);
} else {
  const router = express.Router();
  router.post("/link-email", linkEmail);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
