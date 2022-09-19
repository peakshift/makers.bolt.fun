const { PrismaClient } = require('@prisma/client/edge');
const createGlobalModule = require('../utils/createGlobalModule');


const createPrismaClient = () => {
    console.log("New Prisma Client");
    return new PrismaClient({
        log: ["info"],
    });
}

const prisma = createGlobalModule('prisma', createPrismaClient)

module.exports = {
    prisma
}