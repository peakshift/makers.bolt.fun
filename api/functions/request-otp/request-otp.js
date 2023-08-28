const serverless = require("serverless-http");
const { createExpressApp } = require("../../modules");
const express = require("express");
const { prisma } = require("../../prisma");
const { queueService } = require("../../services/queue-service");

const requestOTP = async (req, res) => {
  const { email } = req.body;

  const generatedOTP = generateOTP(6);

  try {
    await prisma.otp.create({
      data: {
        address: email,
        otp: generatedOTP,
        expiresAt: new Date(Date.now() + 5 * 60000), // 5 minutes
      },
    });

    await queueService.emailService.sendOTP(email, generatedOTP);

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
