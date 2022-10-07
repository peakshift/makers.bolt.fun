const { PrismaClient } = process.env.PRISMA_GENERATE_DATAPROXY ? require('@prisma/client/edge') : require('@prisma/client');
const createGlobalModule = require('../utils/createGlobalModule');


const createPrismaClient = () => {
    console.log("New Prisma Client");
    try {
        const prisma = new PrismaClient({
            log: [
                {
                    emit: 'stdout',
                    level: 'query',
                },
                {
                    emit: 'stdout',
                    level: 'error',
                },
                {
                    emit: 'stdout',
                    level: 'info',
                },
                {
                    emit: 'stdout',
                    level: 'warn',
                },
            ],
        })
        // prisma.$on('query', (e) => {
        //     const timestamp = Date.now();
        //     console.log(`%c${Math.floor(timestamp / 1000).toString().slice(-3)}`, 'background: #222; color: #bada55');
        //     console.log(e.query)
        //     // console.log('Params: ' + e.params)
        // })
        return prisma;
    } catch (error) {
        console.log(error);
    }
}

const prisma = createGlobalModule('prisma', createPrismaClient)


module.exports = {
    prisma
}