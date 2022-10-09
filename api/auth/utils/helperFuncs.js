
const { prisma } = require('../../prisma')

const getUserByPubKey = (pubKey) => {
    if (!pubKey) return null;
    return prisma.userKey.findUnique({
        where: {
            key: pubKey
        },
    }).user()
}

const getUserById = (id) => {
    if (!id) return null;
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}


module.exports = {
    getUserByPubKey,
    getUserById,
}