const { PrismaClient } = process.env.PRISMA_GENERATE_DATAPROXY
  ? require("@prisma/client/edge")
  : require("@prisma/client");

const { withAccelerate } = require("@prisma/extension-accelerate");

const createGlobalModule = require("../utils/createGlobalModule");

const createPrismaClient = () => {
  console.log("New Prisma Client");
  try {
    const prisma = new PrismaClient({
      log: ["error"],
    }).$extends(withAccelerate());

    return prisma;
  } catch (error) {
    console.log(error);
  }
};

const prisma = createGlobalModule("prisma", createPrismaClient);

module.exports = {
  prisma,
};
