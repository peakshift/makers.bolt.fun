const { PrismaClient } = require('@prisma/client')

let prisma;

if (!global.prisma) {
    console.log("New Prisma Client");
    global.prisma = new PrismaClient({
        log: ["info"],
    });
}
prisma = global.prisma;

module.exports = {
    prisma
}