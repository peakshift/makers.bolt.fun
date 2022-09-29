const { PrismaClient } = process.env.PRISMA_GENERATE_DATAPROXY ? require('@prisma/client/edge') : require('@prisma/client');
const createGlobalModule = require('../utils/createGlobalModule');


const createPrismaClient = () => {
    console.log("New Prisma Client");
    try {
        return new PrismaClient();
    } catch (error) {
        console.log(error);
    }
}

const prisma = createGlobalModule('prisma', createPrismaClient)


module.exports = {
    prisma
}