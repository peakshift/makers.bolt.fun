const { schedule } = require("@netlify/functions");
const { prisma } = require("../../prisma");

console.log(process.env.DATABASE_PROXY_URL);

const handler = async function (event, context) {
  const now = new Date();

  await prisma.otp.findMany({
    where: {
      expiresAt: {
        lte: now,
      },
    },
  });

  console.log(
    "Clean DB Scheduled function ran successfully at: ",
    new Date().toLocaleString()
  );

  return {
    statusCode: 200,
  };
};

exports.handler = schedule("@hourly", handler);
