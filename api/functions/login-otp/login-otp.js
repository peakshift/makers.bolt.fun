const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { prisma } = require("../../prisma");
const {
  generateAuthToken,
  getAuthCookieConfig,
  createNewUser,
} = require("../../auth/utils/helperFuncs");

const loginOTP = async (req, res) => {
  const { email, nostr_pubkey, otp } = req.body;

  if (!email && !otp)
    return res
      .status(400)
      .json({ status: "ERROR", message: "No email or nostr_pubkey provided" });

  try {
    const otpExist = await prisma.otp.findFirst({
      where: {
        address: email || nostr_pubkey,
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

    // const userExist = !!email ? prisma.userEmail.findFirst({
    //   where: {
    //     email,
    //   },

    // }): prisma.userNostrPubkey.findFirst({
    //   where: {
    //     nostr_pubkey,
    //   },
    // });

    let exisingUser;

    if (email) {
      exisingUser = await prisma.userEmail.findFirst({
        where: {
          email,
        },
      });
    } else if (nostr_pubkey) {
      exisingUser = await prisma.userNostrKey.findFirst({
        where: {
          key: nostr_pubkey,
        },
      });
    }

    await prisma.otp.delete({
      where: {
        id: otpExist.id,
      },
    });

    let userId = exisingUser?.user_id;

    if (!userId) {
      userId = (await createNewUser()).id;

      if (email)
        await prisma.userEmail.create({
          data: {
            email,
            user_id: userId,
          },
        });
      else if (nostr_pubkey)
        await prisma.userNostrKey.create({
          data: {
            key: nostr_pubkey,
            user_id: userId,
          },
        });
    }

    const authToken = await generateAuthToken(userId, null);

    const cookieConfig = getAuthCookieConfig();

    return res
      .status(200)
      .set("Cache-Control", "no-store")
      .cookie("Authorization", authToken, cookieConfig)
      .json({ logged_in: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/login-otp", loginOTP);
} else {
  const router = express.Router();
  router.post("/login-otp", loginOTP);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};
