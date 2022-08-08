
const { prisma } = require('../../prisma')

const getUserByPubKey = (pubKey) => {
    if (!pubKey) return null;
    return prisma.userKey.findUnique({
        where: {
            key: pubKey
        },
    }).user()
}


module.exports = {
    getUserByPubKey,
}