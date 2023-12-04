const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { prisma } = require("../../prisma");
const { queueService } = require("../../services/queue-service");

const requestOTP = async (req, res) => {
  const { email, nostrPubkey, relay } = req.body;

  const generatedOTP = generateOTP(6);

  if (!email && !nostrPubkey)
    return res
      .status(400)
      .json({ status: "ERROR", message: "No email or nostrPubkey provided" });

  try {
    await prisma.otp.create({
      data: {
        address: email || nostrPubkey,
        otp: generatedOTP,
        expiresAt: new Date(Date.now() + 5 * 60000), // 5 minutes
      },
    });

    if (email) await queueService.emailService.sendOTP(email, generatedOTP);
    else if (nostrPubkey) {
      await queueService.nostrService.sendDMToUser({
        message: NOSTR_OTP_DM_TEMPLATE(generatedOTP),
        recipient_nostr_pubkey: nostrPubkey,
        relay,
      });
    }

    return res.status(200).json({ status: "OK", message: "OTP sent" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error happened, please try again");
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.post("/request-otp", requestOTP);
} else {
  const router = express.Router();
  router.post("/request-otp", requestOTP);
  app = createExpressApp(router);
}

const handler = serverless(app);
exports.handler = async (event, context) => {
  return await handler(event, context);
};

function generateOTP(length = 6) {
  // Declare a digits variable
  // which stores all digits
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const NOSTR_OTP_DM_TEMPLATE = (otp) =>
  `Hi!
This is your OTP: ${otp} that you can use to login to BOLT.FUN.

If you didn't request this OTP, please ignore this message. & NEVER share this code with anyone else.
`;
