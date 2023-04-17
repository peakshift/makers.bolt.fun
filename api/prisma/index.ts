import { PrismaClient } from "../../prisma/.client";
import createGlobalModule from "../utils/createGlobalModule";

// const { PrismaClient } = process.env.PRISMA_GENERATE_DATAPROXY
//   ? require("@prisma/client/edge")
//   : require("@prisma/client");

const createPrismaClient = () => {
  console.log("New Prisma Client");
  try {
    const prisma = new PrismaClient({
      log: ["error"],
    });
    prisma.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();

      // console.info(`Query took ${after - before}ms`)
      return result;
    });
    return prisma;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const prisma = new PrismaClient({
  log: ["error"],
});
