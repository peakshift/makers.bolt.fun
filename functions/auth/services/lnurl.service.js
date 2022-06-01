const lnurl = require('lnurl')
const crypto = require('crypto')
const { prisma } = require('../../prisma')


async function generateSecret() {
    let secret = null
    const maxAttempts = 5
    let attempt = 0
    while (secret === null && attempt < maxAttempts) {
        secret = crypto.randomBytes(32).toString('hex')
        const hash = createHash(secret)
        const isUsed = await isHashUsed(hash);
        if (isUsed) {
            secret = null
        }
        attempt++
    }
    if (!secret) {
        const message = 'Too many failed attempts to generate unique secret'
        throw new Error(message)
    }
    return secret
}

function isHashUsed(hash) {
    return prisma.generatedK1.findFirst({ where: { value: hash } })
}

function addHash(hash) {
    prisma.generatedK1.create({
        data: {
            value: hash,
        }
    })
}

function removeHash(hash) {
    prisma.generatedK1.delete({
        where: {
            value: hash,
        }
    })
}

function removeExpiredHashes() {
    const now = new Date();
    const lastHourDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 1, now.getMinutes());

    prisma.generatedK1.deleteMany({
        where: {
            createdAt: {
                lt: lastHourDate
            }
        }
    })
}

async function generateAuthUrl() {
    const hostname = 'http://localhost:8888/dev/auth/login'
    const secret = await generateSecret()
    addHash(createHash(secret))
    const url = `${hostname}?tag=login&k1=${secret}`
    return {
        url,
        encoded: lnurl.encode(url).toUpperCase(),
        secret,
    }
}

function verifySig(sig, k1, key) {
    if (!lnurl.verifyAuthorizationSignature(sig, k1, key)) {
        const message = 'Signature verification failed'
        throw new Error(message)
    }
    const hash = createHash(k1)
    return { key, hash }
}

function createHash(data) {
    if (!(typeof data === 'string' || Buffer.isBuffer(data))) {
        throw new Error(
            JSON.stringify({ status: 'ERROR', reason: 'Secret must be a string or a Buffer' })
        )
    }
    if (typeof data === 'string') {
        data = Buffer.from(data, 'hex')
    }
    return crypto.createHash('sha256').update(data).digest('hex')
}

module.exports = {
    generateAuthUrl: generateAuthUrl,
    verifySig: verifySig,
    removeHash: removeHash,
    removeExpiredHashes: removeExpiredHashes
}