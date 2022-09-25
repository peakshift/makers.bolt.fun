const { PrismaClient } = process.env.NODE_ENV === 'development' ? require('@prisma/client') : require('@prisma/client/edge');
const createGlobalModule = require('../utils/createGlobalModule');


const createPrismaClient = () => {
    console.log("New Prisma Client");
    try {
        return new PrismaClient({
            log: ["info"],
        });
    } catch (error) {
        console.log(error);
    }
}

const prisma = createGlobalModule('prisma', createPrismaClient)


module.exports = {
    prisma
}