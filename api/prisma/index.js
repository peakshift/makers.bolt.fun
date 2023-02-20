const { PrismaClient } = require("@prisma/client");
const createGlobalModule = require("../utils/createGlobalModule");
const { default: useAccelerate } = require("@prisma/extension-accelerate");

const createPrismaClient = () => {
  console.log("New Prisma Client");
  try {
    const prisma = new PrismaClient().$extends(useAccelerate);
    console.log(prisma);
    prisma.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();

      // console.info(`Query took ${after - before}ms`)
      return result;
    });
    return prisma;
  } catch (error) {
    console.log("ERROR IN CREATING PRISMA CLIENT");
    console.log(error);
  }
};

const prisma = createGlobalModule("prisma", createPrismaClient);

module.exports = {
  prisma,
};
