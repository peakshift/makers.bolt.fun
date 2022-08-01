
const { prisma } = require('../../prisma')

const getUserByPubKey = (pubKey) => {
    if (!pubKey) return null;
    return prisma.user.findFirst({
        where: { pubKey }
    })
}


module.exports = {
    getUserByPubKey,
}